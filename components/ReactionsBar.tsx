/* eslint-disable prettier/prettier */
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  slug: string
  maxPerReaction?: number
}

// prettier-ignore
const REACTIONS = [
  { id: 'clap', emoji: '👏', label: 'Clap' },
  { id: 'heart', emoji: '❤️', label: 'Love' },
  { id: 'party', emoji: '🎉', label: 'Celebrate' },
  { id: 'laugh', emoji: '😄', label: 'Funny' },
  { id: 'think', emoji: '💡', label: 'Insightful' },
]

const DEFAULT_MAX = 2000

export default function ReactionsBar({ slug, maxPerReaction = DEFAULT_MAX }: Props) {
  const [totals, setTotals] = useState<Record<string, number>>({})
  const [local, setLocal] = useState<Record<string, number>>({})
  const [queue, setQueue] = useState<Record<string, number>>({})
  const [burst, setBurst] = useState<string | null>(null)

  // -------------------- initial fetch ---------------------------------------
  useEffect(() => {
    fetch(`/api/reactions?slug=${slug}`)
      .then((r) => r.json())
      .then((d) => setTotals(d))
  }, [slug])

  // -------------------- hydrate localStorage --------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = JSON.parse(localStorage.getItem(`react-${slug}`) || '{}') as Record<
      string,
      number
    >
    setLocal(saved)
  }, [slug])

  // -------------------- flush queue (debounce) ------------------------------
  useEffect(() => {
    const keys = Object.keys(queue)
    if (keys.length === 0) return
    const timer = setTimeout(() => {
      keys.forEach((k) => {
        const inc = queue[k]
        if (!inc) return
        fetch('/api/reactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, reaction: k, count: inc }),
        })
          .then((r) => r.json())
          .then(({ total }) =>
            setTotals((t) => ({ ...t, [k]: typeof total === 'number' ? total : t[k] }))
          )
      })
      setQueue({})
    }, 400)
    return () => clearTimeout(timer)
  }, [queue, slug])

  // -------------------- click handler ---------------------------------------
  const react = (id: string) => {
    const already = local[id] || 0
    if (already >= maxPerReaction) return

    setBurst(id)
    setTimeout(() => setBurst(null), 400)

    setLocal((l) => {
      const next = { ...l, [id]: (l[id] || 0) + 1 }
      if (typeof window !== 'undefined') {
        localStorage.setItem(`react-${slug}`, JSON.stringify(next))
      }
      return next
    })
    setTotals((t) => ({ ...t, [id]: (t[id] || 0) + 1 }))
    setQueue((q) => ({ ...q, [id]: (q[id] || 0) + 1 }))
  }

  // -------------------- render ---------------------------------------------
  return (
    <div className="mt-12 border-t border-gray-200/50 pt-6 dark:border-gray-700/50">
      <div className="mx-auto flex max-w-xs justify-between">
        {REACTIONS.map(({ id, emoji, label }) => {
          const disabled = (local[id] || 0) >= maxPerReaction
          return (
            <button
              key={id}
              onClick={() => react(id)}
              disabled={disabled}
              className="group hover:text-primary-400 relative flex flex-col items-center text-gray-400 disabled:opacity-30"
              aria-label={label}
            >
              <span className="text-2xl leading-none">{emoji}</span>
              <span className="mt-0.5 text-xs font-medium tabular-nums">{totals[id] ?? 0}</span>
              <AnimatePresence>
                {burst === id && (
                  <motion.span
                    key="b"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="bg-primary-500/10 absolute inset-0 rounded-full"
                  />
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </div>
    </div>
  )
}
