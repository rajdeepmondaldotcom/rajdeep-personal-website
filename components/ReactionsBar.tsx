'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  slug: string
  maxPerReaction?: number
}

const REACTIONS = [
  { id: 'clap', emoji: '👏', label: 'Clap' },
  { id: 'heart', emoji: '❤️', label: 'Love' },
  { id: 'party', emoji: '🎉', label: 'Celebrate' },
  { id: 'laugh', emoji: '😂', label: 'Funny' },
  { id: 'think', emoji: '🤔', label: 'Thought-provoking' },
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
    const saved = JSON.parse(localStorage.getItem(`react-${slug}`) || '{}') as Record<string, number>
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
    setTimeout(() => setBurst(null), 500)

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
    <div className="mt-8 flex flex-wrap justify-center gap-6">
      {REACTIONS.map(({ id, emoji, label }) => (
        <button
          key={id}
          onClick={() => react(id)}
          disabled={(local[id] || 0) >= maxPerReaction}
          className="group relative flex flex-col items-center text-gray-600 hover:text-rose-600 disabled:opacity-40 dark:text-gray-400 dark:hover:text-rose-500"
          aria-label={label}
        >
          <span className="text-3xl leading-none">{emoji}</span>
          <span className="mt-1 text-sm tabular-nums">{totals[id] ?? 0}</span>
          <AnimatePresence>
            {burst === id && (
              <motion.span
                key="b"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-full bg-rose-600/10"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  )
}
