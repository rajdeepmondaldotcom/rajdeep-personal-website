'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  slug: string
  maxPerReaction?: number
}

// prettier-ignore
const REACTIONS = [
  { id: 'think', emoji: '🧠', label: 'Deep Thinking' },
  { id: 'growth', emoji: '🌱', label: 'Growth' },
  { id: 'focus', emoji: '🎯', label: 'Focus' },
  { id: 'valuable', emoji: '💎', label: 'Valuable' },
  { id: 'breakthrough', emoji: '⚡', label: 'Breakthrough' },
]

const DEFAULT_MAX = 10 // More reasonable per-user limit

export default function ReactionsBar({ slug, maxPerReaction = DEFAULT_MAX }: Props) {
  const [totals, setTotals] = useState<Record<string, number>>({})
  const [local, setLocal] = useState<Record<string, number>>({})
  const [queue, setQueue] = useState<Record<string, number>>({})
  const [burst, setBurst] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

    setIsLoading(true)
    setError(null)

    const timer = setTimeout(async () => {
      try {
        await Promise.all(
          keys.map(async (k) => {
            const inc = queue[k]
            if (!inc) return

            const response = await fetch('/api/reactions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ slug, reaction: k, count: inc }),
            })

            if (!response.ok) {
              throw new Error(`Failed to update ${k} reactions`)
            }

            const { total } = await response.json()
            setTotals((t) => ({ ...t, [k]: typeof total === 'number' ? total : t[k] }))
          })
        )
      } catch (err) {
        setError('Failed to save reactions. Please try again.')
        console.error('Reactions error:', err)
        // Revert optimistic updates on error
        setTotals((t) => {
          const reverted = { ...t }
          keys.forEach((k) => {
            const inc = queue[k]
            if (inc) reverted[k] = Math.max(0, (reverted[k] || 0) - inc)
          })
          return reverted
        })
      } finally {
        setIsLoading(false)
        setQueue({})
      }
    }, 800) // Slightly longer debounce for better batching

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
    <div className="border-b border-gray-200/50 mt-12 pt-8 dark:border-gray-700/50">
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          How did this post make you feel?
        </h3>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="mx-auto flex max-w-md items-center justify-center gap-4">
        {REACTIONS.map(({ id, emoji, label }) => {
          const localCount = local[id] || 0
          const totalCount = totals[id] ?? 0
          const disabled = localCount >= maxPerReaction
          const hasReacted = localCount > 0

          return (
            <div key={id} className="flex flex-col items-center">
              <button
                onClick={() => react(id)}
                disabled={disabled || isLoading}
                className={`group relative flex flex-col items-center rounded-xl p-2 transition-all duration-200 ${
                  hasReacted
                    ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'hover:text-primary-500 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                } disabled:cursor-not-allowed disabled:opacity-40`}
                aria-label={`${label} (${localCount}/${maxPerReaction} used)`}
                title={`${label} - You've reacted ${localCount} times`}
              >
                <span
                  className={`text-3xl leading-none transition-transform duration-200 ${
                    hasReacted ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                >
                  {emoji}
                </span>

                <div className="mt-1 flex flex-col items-center">
                  <span className="text-sm font-bold tabular-nums">{totalCount}</span>
                  {hasReacted && (
                    <span className="text-primary-500 text-xs font-medium">+{localCount}</span>
                  )}
                </div>

                <AnimatePresence>
                  {burst === id && (
                    <motion.span
                      key="burst"
                      initial={{ scale: 0, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="bg-primary-500/20 border-primary-500/40 absolute inset-0 rounded-xl border-2"
                    />
                  )}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-primary-500 absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full"
                  />
                )}
              </button>

              {disabled && <span className="mt-1 text-xs text-gray-400">Max reached</span>}
            </div>
          )
        })}
      </div>

    </div>
  )
}
