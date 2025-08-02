import { NextRequest, NextResponse } from 'next/server'

// Shared util to obtain a KV client or suitable fallbacks ---------------------
let kv: { get: Function; incrby: Function } | null = null
try {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const mod = await import('@vercel/kv')
  kv = mod?.kv ? mod : null
} catch {}

const REST_URL =
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_URL ||
  ''
const REST_TOKEN =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_READ_ONLY_TOKEN ||
  ''

async function restGet(key: string) {
  if (!REST_URL || !REST_TOKEN) return null
  const res = await fetch(`${REST_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const json = (await res.json()) as { result: number | null }
  return json.result
}

async function restIncrBy(key: string, inc: number) {
  if (!REST_URL || !REST_TOKEN) return null
  const res = await fetch(
    `${REST_URL}/incrby/${encodeURIComponent(key)}/${inc}`,
    { headers: { Authorization: `Bearer ${REST_TOKEN}` }, cache: 'no-store' }
  )
  if (!res.ok) return null
  const json = (await res.json()) as { result: number }
  return json.result
}

// In-memory fallback -----------------------------------------------------------
const mem = new Map<string, number>()
const memGet = (k: string) => mem.get(k) ?? 0
const memIncr = (k: string, inc: number) => {
  const v = memGet(k) + inc
  mem.set(k, v)
  return v
}

// Helpers ----------------------------------------------------------------------
const PREFIX = 'react:'
const CAP = 2000 // max per single increment safeguard

async function get(key: string) {
  if (kv) return (await kv.get<number>(key)) ?? 0
  const r = await restGet(key)
  if (r !== null) return r
  return memGet(key)
}
async function incr(key: string, inc: number) {
  inc = Math.max(1, Math.min(inc, CAP))
  if (kv) return (await kv.incrby<number>(key, inc))
  const r = await restIncrBy(key, inc)
  if (r !== null) return r
  return memIncr(key, inc)
}

// GET: /api/reactions?slug=...  => { clap: 3, heart: 1, ... }
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'slug missing' }, { status: 400 })
  const keys = ['clap', 'heart', 'laugh', 'party', 'think']
  const result: Record<string, number> = {}
  for (const k of keys) {
    result[k] = await get(`${PREFIX}${slug}:${k}`)
  }
  return NextResponse.json(result)
}

// POST body: { slug, reaction, count }
export async function POST(req: NextRequest) {
  const { slug, reaction, count = 1 } = (await req.json()) as {
    slug?: string
    reaction?: string
    count?: number
  }
  if (!slug || !reaction)
    return NextResponse.json({ error: 'slug/reaction missing' }, { status: 400 })
  const total = await incr(`${PREFIX}${slug}:${reaction}`, count)
  return NextResponse.json({ total })
}
