import { useState, useEffect, RefObject } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Confetti from 'react-confetti'

type HybridReadingProgressProps = {
  target: RefObject<HTMLElement>
  wordCount: number
}

const HybridReadingProgress = ({ target, wordCount }: HybridReadingProgressProps) => {
  const [percentRead, setPercentRead] = useState(0)
  const [minutesLeft, setMinutesLeft] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

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

      if (percent >= 100 && !isComplete) {
        setIsComplete(true)
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
  }, [scrollYProgress, wordCount, isComplete])

  return (
    <>
      {isComplete && <Confetti width={windowSize.width} height={windowSize.height} />}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-[0%] bg-gradient-to-r from-primary-500 to-primary-600"
        style={{ scaleX }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentRead}
        aria-label="Reading Progress"
      />
      <div className="fixed bottom-4 right-4 z-50 hidden sm:block">
        <div className="relative h-20 w-20">
          <motion.svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-gray-200 dark:stroke-gray-700"
              strokeWidth="10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-primary-500"
              strokeWidth="10"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ pathLength: scrollYProgress }}
            />
          </motion.svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {percentRead}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {minutesLeft} min left
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default HybridReadingProgress 