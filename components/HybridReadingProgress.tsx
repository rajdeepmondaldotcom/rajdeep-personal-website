'use client'

import { useState, useEffect, RefObject, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Confetti from 'react-confetti'

type HybridReadingProgressProps = {
  target: RefObject<HTMLElement>
  wordCount: number
}

export const HybridReadingProgress = ({ target, wordCount }: HybridReadingProgressProps) => {
  const [percentRead, setPercentRead] = useState(0)
  const [minutesLeft, setMinutesLeft] = useState(0)
  const [runConfetti, setRunConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const hasCompleted = useRef(false)

  const { scrollYProgress } = useScroll({
    target: target,
    offset: ['start end', 'end end'],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const percent = Math.round(latest * 100)
      setPercentRead(percent)

      const wordsPerMinute = 200
      const totalMinutes = wordCount / wordsPerMinute
      const minutesRemaining = totalMinutes * (1 - latest)
      setMinutesLeft(Math.ceil(minutesRemaining))

      if (percent >= 100 && !hasCompleted.current) {
        setRunConfetti(true)
        hasCompleted.current = true
      }
    })

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      unsubscribe()
      window.removeEventListener('resize', handleResize)
    }
  }, [scrollYProgress, wordCount])

  return (
    <>
      {runConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
          onConfettiComplete={() => setRunConfetti(false)}
        />
      )}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-[0%] bg-gradient-to-r from-pink-500 to-yellow-500"
        style={{ scaleX }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentRead}
        aria-label="Reading Progress"
      />
      <motion.div
        className="fixed bottom-6 right-6 z-50 hidden sm:block"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="relative h-24 w-24">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(var(--color-primary-500))" />
                <stop offset="100%" stopColor="rgb(var(--color-primary-400))" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-gray-200/50 dark:stroke-gray-700/50"
              strokeWidth="10"
              pathLength="1"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#progressGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {percentRead}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {minutesLeft} min left
            </span>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default HybridReadingProgress 