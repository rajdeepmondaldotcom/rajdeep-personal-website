import { useEffect, useState } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { UseReadingProgressReturn } from '@/lib/types'
import { UI } from '@/lib/constants'

/**
 * Custom hook to track reading progress
 * Returns motion values for progress indicators
 */
export const useReadingProgress = (
  target: React.RefObject<HTMLElement | null>,
  wordCount: number
): UseReadingProgressReturn => {
  const [percentageRead, setPercentageRead] = useState(0)
  const [estimatedMinutesLeft, setEstimatedMinutesLeft] = useState(
    Math.ceil(wordCount / UI.WORDS_PER_MINUTE)
  )

  const scrollYProgress = useMotionValue(0)
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Transform scroll progress to scale for top bar
  const topBarScaleX = useTransform(smoothScrollYProgress, [0, 1], [0, 1])

  // Transform scroll progress to colors for circular progress
  const circularProgressColor = useTransform(
    smoothScrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#6366f1', '#8b5cf6', '#a855f7', '#10b981', '#10b981'] // indigo -> purple -> violet -> green
  )

  const circularProgressColorDark = useTransform(
    smoothScrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#818cf8', '#a78bfa', '#c084fc', '#34d399', '#34d399'] // light indigo -> light purple -> light violet -> light green
  )

  // Update percentage and reading time when scroll progress changes
  useEffect(() => {
    const unsubscribe = smoothScrollYProgress.on('change', (latest) => {
      const percentage = Math.round(latest * 100)
      setPercentageRead(percentage)

      const wordsRead = Math.floor(wordCount * latest)
      const wordsRemaining = wordCount - wordsRead
      const minutesLeft = Math.ceil(wordsRemaining / UI.WORDS_PER_MINUTE)
      setEstimatedMinutesLeft(Math.max(0, minutesLeft))
    })

    return () => unsubscribe()
  }, [smoothScrollYProgress, wordCount])

  useEffect(() => {
    if (!target.current) return

    const element = target.current
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = element.scrollHeight
      const scrollTop = window.scrollY
      const elementTop = element.offsetTop

      // Calculate how much of the element has been scrolled
      const scrollableHeight = documentHeight - windowHeight + elementTop
      const scrolledAmount = scrollTop - elementTop
      const progress = Math.max(0, Math.min(1, scrolledAmount / scrollableHeight))

      scrollYProgress.set(progress)
    }

    // Initial calculation
    updateScrollProgress()

    // Update on scroll
    window.addEventListener('scroll', updateScrollProgress)
    window.addEventListener('resize', updateScrollProgress)

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [target, scrollYProgress])

  return {
    percentageRead,
    estimatedMinutesLeft,
    topBarScaleX,
    circularProgressColor,
    circularProgressColorDark,
    scrollYProgress: smoothScrollYProgress,
  }
}
