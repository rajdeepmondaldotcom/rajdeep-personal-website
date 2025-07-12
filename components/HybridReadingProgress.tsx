'use client'

import { useState, useEffect, RefObject } from 'react'
import { motion, MotionValue } from 'framer-motion'
import { Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useReadingProgress } from '@/lib/hooks/useReadingProgress'

type TopProgressBarProps = {
  scaleX: MotionValue<number>
  backgroundColor: MotionValue<string>
  ariaValueNow: number
}

const TopProgressBar = ({ scaleX, backgroundColor, ariaValueNow }: TopProgressBarProps) => (
  <motion.div
    className="bg-primary-500 fixed top-0 right-0 left-0 h-1 origin-[0%]"
    style={{ scaleX, backgroundColor }}
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={ariaValueNow}
    aria-label="Reading Progress"
  />
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
        {percentageRead < 100 ? (
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress, stroke: strokeColor }}
          />
        ) : (
          <motion.circle cx="50" cy="50" r="45" strokeWidth="10" style={{ stroke: strokeColor }} />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {percentageRead < 100 ? (
          <>
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {percentageRead}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {estimatedMinutesLeft} min left
            </span>
          </>
        ) : (
          <Check className="h-10 w-10 text-emerald-500" />
        )}
      </div>
    </div>
  </motion.button>
)

type HybridReadingProgressProps = {
  target: RefObject<HTMLElement>
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
