/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// REST credentials (works for Upstash Redis, Vercel KV, etc.)
// ---------------------------------------------------------------------------
const REST_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.KV_URL || ''
const REST_TOKEN =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_READ_ONLY_TOKEN ||
  ''

async function restGet(key: string): Promise<number | null> {
  if (!REST_URL || !REST_TOKEN) return null
  const res = await fetch(`${REST_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const json = (await res.json()) as { result: number | null }
  return json.result ?? 0
}

async function restIncr(key: string, inc: number): Promise<number | null> {
  if (!REST_URL || !REST_TOKEN) return null
  const res = await fetch(`${REST_URL}/incrby/${encodeURIComponent(key)}/${inc}`, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const json = (await res.json()) as { result: number }
  return json.result
}

// ---------------------------------------------------------------------------
// In-memory fallback for local dev
// ---------------------------------------------------------------------------
const mem = new Map<string, number>()
const memGet = (k: string) => mem.get(k) ?? 0
const memIncr = (k: string, inc: number) => {
  const val = memGet(k) + inc
  mem.set(k, val)
  return val
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const PREFIX = 'react:'
const VALID = ['think', 'growth', 'focus', 'valuable', 'breakthrough']

async function get(key: string) {
  const rest = await restGet(key)
  if (rest !== null) return rest
  return memGet(key)
}

async function incr(key: string, inc: number) {
  const rest = await restIncr(key, inc)
  if (rest !== null) return rest
  return memIncr(key, inc)
}

// ---------------------------------------------------------------------------
// GET: /api/reactions?slug=...
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'slug missing' }, { status: 400 })

  const totals: Record<string, number> = {}
  await Promise.all(
    VALID.map(async (r) => {
      totals[r] = await get(`${PREFIX}${slug}:${r}`)
    })
  )
  return NextResponse.json(totals)
}

// ---------------------------------------------------------------------------
// POST body: { slug, reaction, count }
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const {
    slug,
    reaction,
    count = 1,
  } = (await req.json()) as {
    slug?: string
    reaction?: string
    count?: number
  }
  if (!slug || !reaction || !VALID.includes(reaction))
    return NextResponse.json({ error: 'bad request' }, { status: 400 })

  const total = await incr(`${PREFIX}${slug}:${reaction}`, Math.max(1, Math.min(count, 2000)))
  return NextResponse.json({ total })
}
