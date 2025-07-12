'use client'

import { useState, useEffect, RefObject } from 'react'
import { useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'

const WORDS_PER_MINUTE = 200

type UseReadingProgressValues = {
  percentageRead: number
  estimatedMinutesLeft: number
  topBarScaleX: MotionValue<number>
  circularProgressColor: MotionValue<string>
  circularProgressColorDark: MotionValue<string>
  scrollYProgress: MotionValue<number>
}

export const useReadingProgress = (
  target: RefObject<HTMLElement>,
  wordCount: number
): UseReadingProgressValues => {
  const [percentageRead, setPercentageRead] = useState(0)
  const [estimatedMinutesLeft, setEstimatedMinutesLeft] = useState(0)

  const { scrollYProgress } = useScroll({
    target: target,
    offset: ['start end', 'end end'],
  })

  const topBarScaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const circularProgressColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#2563eb', '#16a34a', '#eab308']
  )
  const circularProgressColorDark = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#60a5fa', '#4ade80', '#facc15']
  )

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (scrollProgress) => {
      setPercentageRead(Math.round(scrollProgress * 100))

      const totalReadingTime = wordCount / WORDS_PER_MINUTE
      const minutesRemaining = totalReadingTime * (1 - scrollProgress)
      setEstimatedMinutesLeft(Math.ceil(minutesRemaining))
    })

    return () => {
      unsubscribe()
    }
  }, [scrollYProgress, wordCount])

  return {
    percentageRead,
    estimatedMinutesLeft,
    topBarScaleX,
    circularProgressColor,
    circularProgressColorDark,
    scrollYProgress,
  }
}
