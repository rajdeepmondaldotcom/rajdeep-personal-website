'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ClapButtonProps {
  slug: string
  maxClaps?: number // default 50 like Medium
}

const MAX_CLAPS_DEFAULT = 50

export default function ClapButton({ slug, maxClaps = MAX_CLAPS_DEFAULT }: ClapButtonProps) {
  const [total, setTotal] = useState<number>(0)
  const [localClaps, setLocalClaps] = useState<number>(0)
  const [queued, setQueued] = useState<number>(0)
  const [isBurst, setBurst] = useState(false)

  // ---------------------------------------------------------------------------
  // 1. Fetch current total
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false
    fetch(`/api/claps?slug=${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setTotal(d.total)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [slug])

  // ---------------------------------------------------------------------------
  // 2. Load local claps from localStorage so user limits persist across sessions
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = parseInt(localStorage.getItem(`claps-${slug}`) || '0', 10)
    setLocalClaps(isNaN(stored) ? 0 : stored)
  }, [slug])

  // ---------------------------------------------------------------------------
  // 3. Flush queued increments to the server (debounced)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (queued === 0) return

    const timer = setTimeout(() => {
      const inc = queued
      setQueued(0)
      fetch('/api/claps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, count: inc }),
      })
        .then((r) => r.json())
        .then((d) => setTotal(d.total))
        .catch(() => {})
    }, 400) // batch multiple fast clicks

    return () => clearTimeout(timer)
  }, [queued, slug])

  // ---------------------------------------------------------------------------
  // 4. Handle single click or hold
  // ---------------------------------------------------------------------------
  const incLocal = () => {
    if (localClaps >= maxClaps) return
    setBurst(true)
    setTimeout(() => setBurst(false), 500)

    setLocalClaps((c) => {
      const next = Math.min(maxClaps, c + 1)
      if (typeof window !== 'undefined') {
        localStorage.setItem(`claps-${slug}`, String(next))
      }
      return next
    })

    setTotal((t) => t + 1)
    setQueued((q) => q + 1)
  }

  // Support press-and-hold auto–clap (fires every 120 ms)
  let holdInterval: NodeJS.Timeout | null = null
  const onMouseDown = () => {
    incLocal()
    holdInterval = setInterval(incLocal, 120)
  }
  const onMouseUp = () => {
    if (holdInterval) clearInterval(holdInterval)
  }

  return (
    <button
      onClick={incLocal}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      disabled={localClaps >= maxClaps}
      aria-label="Clap for this post"
      className="group relative flex items-center gap-2 text-gray-600 transition-colors select-none hover:text-rose-600 disabled:opacity-40 dark:text-gray-400 dark:hover:text-rose-500"
    >
      {/* Hand clap emoji for simplicity; replace with custom SVG if desired */}
      <span className="text-xl">👏</span>
      <span className="text-sm tabular-nums">{total}</span>

      {/* Burst animation */}
      <AnimatePresence>
        {isBurst && (
          <motion.span
            key="burst"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute -inset-1 rounded-full bg-rose-600/10"
          />
        )}
      </AnimatePresence>
    </button>
  )
}
