'use client'

import { useState, useEffect, RefObject } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { useTheme } from 'next-themes'

type HybridReadingProgressProps = {
  target: RefObject<HTMLElement>
  wordCount: number
}

export const HybridReadingProgress = ({ target, wordCount }: HybridReadingProgressProps) => {
  const [percentRead, setPercentRead] = useState(0)
  const [minutesLeft, setMinutesLeft] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: target,
    offset: ['start end', 'end end'],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const strokeColor = useTransform(scrollYProgress, [0, 0.5, 1], ['#2563eb', '#16a34a', '#eab308'])
  const strokeColorDark = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#60a5fa', '#4ade80', '#facc15']
  )

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const percent = Math.round(latest * 100)
      setPercentRead(percent)

      const wordsPerMinute = 200
      const totalMinutes = wordCount / wordsPerMinute
      const minutesRemaining = totalMinutes * (1 - latest)
      setMinutesLeft(Math.ceil(minutesRemaining))
    })

    return () => {
      unsubscribe()
    }
  }, [scrollYProgress, wordCount])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <motion.div
        className="from-primary-500 to-primary-400 dark:from-primary-200 dark:to-primary-100 fixed top-0 right-0 left-0 h-1 origin-[0%] bg-gradient-to-r"
        style={{
          scaleX,
          backgroundColor: mounted && resolvedTheme === 'dark' ? strokeColorDark : strokeColor,
        }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentRead}
        aria-label="Reading Progress"
      />
      {mounted && (
        <motion.button
          aria-label="Scroll to Top"
          onClick={handleScrollTop}
          className="fixed right-6 bottom-6 z-50 hidden rounded-full sm:block"
          whileHover={{ scale: 1.1 }}
          whileFocus={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="relative h-24 w-24">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" fill="none">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-gray-800/20 dark:stroke-gray-200/20"
                strokeWidth="10"
                pathLength="1"
              />
              {percentRead < 100 ? (
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="10"
                  strokeLinecap="round"
                  style={{
                    pathLength: scrollYProgress,
                    stroke: resolvedTheme === 'dark' ? strokeColorDark : strokeColor,
                  }}
                />
              ) : (
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth="10"
                  style={{
                    stroke: resolvedTheme === 'dark' ? strokeColorDark : strokeColor,
                  }}
                />
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {percentRead < 100 ? (
                <>
                  <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    {percentRead}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {minutesLeft} min left
                  </span>
                </>
              ) : (
                <Check className="h-10 w-10 text-emerald-500" />
              )}
            </div>
          </div>
        </motion.button>
      )}
    </>
  )
}

export default HybridReadingProgress
