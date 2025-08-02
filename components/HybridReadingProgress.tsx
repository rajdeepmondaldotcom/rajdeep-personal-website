'use client'

import { useState, useEffect, RefObject } from 'react'
import { motion, MotionValue } from 'framer-motion'
import { Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useReadingProgress } from '@/lib/hooks'

type TopProgressBarProps = {
  scaleX: MotionValue<number>
  backgroundColor: MotionValue<string>
  ariaValueNow: number
}

const TopProgressBar = ({ scaleX, backgroundColor, ariaValueNow }: TopProgressBarProps) => (
  <>
    {/* Progress bar background */}
    <div className="fixed top-20 right-0 left-0 z-40 h-1 bg-gray-200/30 backdrop-blur-sm dark:bg-gray-700/30" />

    {/* Animated progress bar */}
    <motion.div
      className="fixed top-20 left-0 z-40 h-1 origin-[0%] shadow-lg"
      style={{
        scaleX,
        backgroundColor,
        boxShadow: '0 2px 8px rgba(0, 150, 255, 0.3)',
      }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaValueNow}
      aria-label="Reading Progress"
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 blur-sm"
        style={{ backgroundColor: backgroundColor.get() }}
      />
    </motion.div>
  </>
)

type CircularProgressProps = {
  onScrollTop: () => void
  percentageRead: number
  estimatedMinutesLeft: number
  scrollYProgress: MotionValue<number>
  strokeColor: MotionValue<string>
}

const CircularProgress = ({
  onScrollTop,
  percentageRead,
  estimatedMinutesLeft,
  scrollYProgress,
  strokeColor,
}: CircularProgressProps) => (
  <motion.button
    aria-label="Scroll to Top"
    onClick={onScrollTop}
    className="hover:shadow-3xl fixed right-6 bottom-6 z-50 hidden rounded-full bg-white/80 shadow-2xl backdrop-blur-md transition-shadow duration-300 sm:block dark:bg-gray-900/80"
    whileHover={{ scale: 1.05 }}
    whileFocus={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <div className="relative h-20 w-20">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" fill="none">
        <circle
          cx="50"
          cy="50"
          r="40"
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="8"
          pathLength="1"
        />
        {percentageRead < 100 ? (
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            strokeWidth="8"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress,
              stroke: strokeColor,
              filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))',
            }}
          />
        ) : (
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            strokeWidth="8"
            style={{
              stroke: strokeColor,
              filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.3))',
            }}
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {percentageRead < 100 ? (
          <>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {percentageRead}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {estimatedMinutesLeft} min
            </span>
          </>
        ) : (
          <Check className="h-8 w-8 animate-bounce text-emerald-500" />
        )}
      </div>
    </div>
  </motion.button>
)

type HybridReadingProgressProps = {
  target: RefObject<HTMLElement | null>
  wordCount: number
}

export const HybridReadingProgress = ({ target, wordCount }: HybridReadingProgressProps) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const {
    percentageRead,
    estimatedMinutesLeft,
    topBarScaleX,
    circularProgressColor,
    circularProgressColorDark,
    scrollYProgress,
  } = useReadingProgress(target, wordCount)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!mounted) {
    return null
  }

  const finalStrokeColor =
    resolvedTheme === 'dark' ? circularProgressColorDark : circularProgressColor

  return (
    <>
      <TopProgressBar
        scaleX={topBarScaleX}
        backgroundColor={finalStrokeColor}
        ariaValueNow={percentageRead}
      />
      <CircularProgress
        onScrollTop={handleScrollTop}
        percentageRead={percentageRead}
        estimatedMinutesLeft={estimatedMinutesLeft}
        scrollYProgress={scrollYProgress}
        strokeColor={finalStrokeColor}
      />
    </>
  )
}

export default HybridReadingProgress
