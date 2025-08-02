import { NextRequest, NextResponse } from 'next/server'

/**
 * This implementation works in three tiers:
 * 1. If `@vercel/kv` is available (on Vercel or installed locally) we use it.
 * 2. Else, if Upstash/Vercel KV REST environment variables are present we call the REST API directly via fetch.
 * 3. Finally, we fall back to an in-memory Map for local development with no credentials.
 */

// ---------- 1. Try @vercel/kv -------------------------------------------------
let kvClient: { get: Function; incrby: Function } | null = null
try {
  // `@vercel/kv` is auto-installed in the Vercel runtime. In local dev you can
  // `yarn add @vercel/kv` (but we keep it optional).
  // eslint-disable-next-line import/no-extraneous-dependencies
  const mod = await import('@vercel/kv')
  kvClient = mod?.kv ? mod : null
} catch {
  // Package not found – will fall back to REST or memory
}

// ---------- 2. Fallback to REST ------------------------------------------------
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
    {
      headers: { Authorization: `Bearer ${REST_TOKEN}` },
      cache: 'no-store',
    }
  )
  if (!res.ok) return null
  const json = (await res.json()) as { result: number }
  return json.result
}

// ---------- 3. In-memory fallback --------------------------------------------
const memoryStore = new Map<string, number>()

function memGet(key: string) {
  return memoryStore.get(key) ?? 0
}
function memIncrBy(key: string, inc: number) {
  const next = (memoryStore.get(key) ?? 0) + inc
  memoryStore.set(key, next)
  return next
}

// ---------- Helpers -----------------------------------------------------------
const KEY_PREFIX = 'clap:'
const MAX_INC = 50

async function getTotal(key: string) {
  if (kvClient) return (await kvClient.get<number>(key)) ?? 0
  const rest = await restGet(key)
  if (rest !== null) return rest
  return memGet(key)
}

async function incrBy(key: string, inc: number) {
  inc = Math.max(1, Math.min(inc, MAX_INC))
  if (kvClient) return (await kvClient.incrby<number>(key, inc))
  const rest = await restIncrBy(key, inc)
  if (rest !== null) return rest
  return memIncrBy(key, inc)
}

// ---------- Route handlers ----------------------------------------------------
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) {
    return NextResponse.json({ error: 'slug missing' }, { status: 400 })
  }
  const total = await getTotal(`${KEY_PREFIX}${slug}`)
  return NextResponse.json({ total })
}

export async function POST(req: NextRequest) {
  const { slug, count = 1 } = (await req.json()) as {
    slug?: string
    count?: number
  }
  if (!slug) {
    return NextResponse.json({ error: 'slug missing' }, { status: 400 })
  }

  const total = await incrBy(`${KEY_PREFIX}${slug}`, count)
  return NextResponse.json({ total })
}

// Uncomment to force Edge runtime (KV works on both):
// export const runtime = 'edge'
