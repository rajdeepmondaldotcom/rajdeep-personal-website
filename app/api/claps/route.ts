import { NextRequest, NextResponse } from 'next/server'

// Dynamically load @upstash/redis only if the package is installed and the
// required environment variables exist. Otherwise fall back to an in-memory
// store so that development works without extra setup.
let redis: any = null
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const { Redis } = await import('@upstash/redis')
    redis = Redis.fromEnv()
  } catch {
    // Package is not installed; continue with the fallback store.
  }
}

// Fallback store (not persisted across server restarts, suitable for local dev)
const memoryStore = new Map<string, number>()

async function getTotal(key: string) {
  if (redis) {
    const val = await redis.get<number>(key)
    return val ?? 0
  }
  return memoryStore.get(key) ?? 0
}

async function increment(key: string) {
  if (redis) {
    return (await redis.incr(key)) as number
  }
  const newTotal = (memoryStore.get(key) ?? 0) + 1
  memoryStore.set(key, newTotal)
  return newTotal
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) {
    return NextResponse.json({ error: 'slug missing' }, { status: 400 })
  }

  const total = await getTotal(`clap:${slug}`)
  return NextResponse.json({ total })
}

export async function POST(req: NextRequest) {
  const { slug } = (await req.json()) as { slug?: string }
  if (!slug) {
    return NextResponse.json({ error: 'slug missing' }, { status: 400 })
  }

  const total = await increment(`clap:${slug}`)
  return NextResponse.json({ total })
}

// Opt-in to the Node runtime by default. Uncomment for Edge:
// export const runtime = 'edge'
