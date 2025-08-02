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

  // Transform scroll progress to colors for circular progress - using site's blue theme
  const circularProgressColor = useTransform(
    smoothScrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#0096FF', '#0EA5E9', '#06B6D4', '#10B981', '#10B981'] // site blue -> sky -> cyan -> green
  )

  const circularProgressColorDark = useTransform(
    smoothScrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#38BDF8', '#0EA5E9', '#22D3EE', '#34D399', '#34D399'] // light blue -> sky -> cyan -> green
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
