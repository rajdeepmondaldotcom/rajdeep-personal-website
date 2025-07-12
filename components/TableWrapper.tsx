'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TableWrapperProps {
  children: React.ReactNode
}

const TableWrapper = ({ children }: TableWrapperProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftShadow(scrollLeft > 0)
    setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1)
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 300
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  return (
    <div className="relative">
      {/* Premium container with glass morphism */}
      <div className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/80">
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 overflow-x-auto"
        >
          {/* Left shadow gradient */}
          <div
            className={`pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-gradient-to-r from-white/80 to-transparent transition-opacity duration-300 dark:from-gray-900/80 dark:to-transparent ${showLeftShadow ? 'opacity-100' : 'opacity-0'} `}
          />

          {/* Right shadow gradient */}
          <div
            className={`pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l from-white/80 to-transparent transition-opacity duration-300 dark:from-gray-900/80 dark:to-transparent ${showRightShadow ? 'opacity-100' : 'opacity-0'} `}
          />

          {/* Enhanced table styling */}
          <div className="min-w-full">
            <style jsx global>{`
              table {
                width: 100%;
                border-collapse: separate;
                border-spacing: 0;
              }
              
              thead {
                background: linear-gradient(to right, #f9fafb, #f3f4f6);
                dark:background: linear-gradient(to right, #1f2937, #111827);
              }
              
              th {
                padding: 1rem 1.5rem;
                font-weight: 600;
                font-size: 0.875rem;
                letter-spacing: 0.025em;
                text-transform: uppercase;
                color: #6b7280;
                dark:color: #9ca3af;
                text-align: left;
                border-bottom: 2px solid #e5e7eb;
                dark:border-bottom-color: #374151;
                position: sticky;
                top: 0;
                background: inherit;
                z-index: 1;
              }
              
              td {
                padding: 1rem 1.5rem;
                font-size: 0.9375rem;
                color: #374151;
                dark:color: #d1d5db;
                border-bottom: 1px solid #f3f4f6;
                dark:border-bottom-color: #1f2937;
              }
              
              tbody tr {
                transition: all 0.2s ease;
              }
              
              tbody tr:hover {
                background-color: #fafbfc;
                dark:background-color: #1a202c;
              }
              
              tbody tr:last-child td {
                border-bottom: none;
              }
            `}</style>
            {children}
          </div>
        </div>

        {/* Scroll buttons */}
        {(canScrollLeft || canScrollRight) && (
          <>
            <motion.button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: canScrollLeft ? 1 : 0.3, x: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-200 ${
                canScrollLeft
                  ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'cursor-not-allowed'
              } dark:bg-gray-800/90`}
            >
              <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </motion.button>

            <motion.button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: canScrollRight ? 1 : 0.3, x: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-1/2 right-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-200 ${
                canScrollRight
                  ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'cursor-not-allowed'
              } dark:bg-gray-800/90`}
            >
              <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </>
        )}
      </div>
    </div>
  )
}

export default TableWrapper
