'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ClapButtonProps {
  slug: string
}

export default function ClapButton({ slug }: ClapButtonProps) {
  const [total, setTotal] = useState<number | null>(null)
  const [isClicked, setIsClicked] = useState(false)

  // Initial fetch
  useEffect(() => {
    fetch(`/api/claps?slug=${slug}`)
      .then((r) => r.json())
      .then((d) => setTotal(d.total))
      .catch(() => setTotal(0))
  }, [slug])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const alreadyClapped = localStorage.getItem(`clapped-${slug}`) === 'true'
    setIsClicked(alreadyClapped)
  }, [slug])

  const handleClap = async () => {
    if (isClicked) return

    setIsClicked(true)
    setTotal((prev) => (prev ?? 0) + 1) // optimistic

    await fetch('/api/claps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })
      .then((r) => r.json())
      .then((d) => setTotal(d.total))
      .catch(() => {})

    if (typeof window !== 'undefined') {
      localStorage.setItem(`clapped-${slug}`, 'true')
    }
  }

  return (
    <button
      onClick={handleClap}
      aria-label="Clap for this post"
      className="group relative flex select-none items-center gap-2 text-gray-600 transition-colors hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-500"
    >
      {/* Hand clap emoji for simplicity; replace with custom SVG if desired */}
      <span className="text-xl">👏</span>
      <span className="text-sm tabular-nums">{total ?? 0}</span>

      {/* Burst animation */}
      <AnimatePresence>
        {isClicked && (
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
