import { NextRequest, NextResponse } from 'next/server'

/**
 * Persistence strategy
 * 1. Try REST API (works for Upstash Redis, Vercel KV, etc.) using env vars that the
 *    official integrations inject (KV_* or UPSTASH_*).
 * 2. Fallback to an in-memory Map for local development.
 *
 * No compile-time dependency on `@vercel/kv`, so the project builds without
 * extra packages. All network calls are runtime fetches.
 */

// ---------------------------------------------------------------------------
// 1. Env-provided REST credentials
// ---------------------------------------------------------------------------
const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.KV_URL || ''
const REST_TOKEN =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_READ_ONLY_TOKEN ||
  ''

async function restGet(key: string): Promise<number | null> {
  if (!REST_URL || !REST_TOKEN) return null
  const url = `${REST_URL}/get/${encodeURIComponent(key)}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const json = (await res.json()) as { result: number | null }
  return json.result ?? 0
}

async function restIncrBy(key: string, inc: number): Promise<number | null> {
  if (!REST_URL || !REST_TOKEN) return null
  const url = `${REST_URL}/incrby/${encodeURIComponent(key)}/${inc}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const json = (await res.json()) as { result: number }
  return json.result
}

// ---------------------------------------------------------------------------
// 2. In-memory fallback (non-persistent) – useful in local dev
// ---------------------------------------------------------------------------
const mem = new Map<string, number>()
const memGet = (k: string) => mem.get(k) ?? 0
const memIncr = (k: string, inc: number) => {
  const v = memGet(k) + inc
  mem.set(k, v)
  return v
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const PREFIX = 'clap:'

async function getTotal(key: string) {
  const rest = await restGet(key)
  if (rest !== null) return rest
  return memGet(key)
}

async function incr(key: string, inc = 1) {
  const rest = await restIncrBy(key, inc)
  if (rest !== null) return rest
  return memIncr(key, inc)
}

// ---------------------------------------------------------------------------
// Route handlers
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'slug missing' }, { status: 400 })
  const total = await getTotal(`${PREFIX}${slug}`)
  return NextResponse.json({ total })
}

export async function POST(req: NextRequest) {
  const { slug, count = 1 } = (await req.json()) as { slug?: string; count?: number }
  if (!slug) return NextResponse.json({ error: 'slug missing' }, { status: 400 })
  const total = await incr(`${PREFIX}${slug}`, Math.max(1, Math.min(count, 2000)))
  return NextResponse.json({ total })
}
