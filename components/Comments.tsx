'use client'

import siteMetadata from '@/data/siteMetadata'
import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Comments = ({ slug: _slug }: { slug: string }) => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const commentsTheme = useMemo(() => {
    if (!mounted) return 'light'
    return theme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light'
  }, [theme, resolvedTheme, mounted])

  const commentsConfig = siteMetadata?.comments

  if (!commentsConfig?.provider) {
    return null
  }

  return (
    <div className="relative mt-16 border-t border-gray-200/50 pt-16 dark:border-gray-700/50">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          <span className="from-primary-600 bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
            Join the Discussion
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Share your thoughts and connect with other readers
        </p>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/50 backdrop-blur-sm dark:bg-gray-900/50"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
                <div className="border-primary-600 absolute top-0 left-0 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Loading comments...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comments Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative rounded-2xl border border-gray-200/50 bg-white/50 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-900/50"
        onLoad={() => setIsLoading(false)}
      >
        {mounted && commentsConfig.provider === 'giscus' && (
          <Giscus
            id="comments"
            repo={commentsConfig.giscusConfig?.repo as `${string}/${string}`}
            repoId={commentsConfig.giscusConfig?.repositoryId || ''}
            category={commentsConfig.giscusConfig?.category || ''}
            categoryId={commentsConfig.giscusConfig?.categoryId || ''}
            mapping={commentsConfig.giscusConfig?.mapping || 'pathname'}
            reactionsEnabled={commentsConfig.giscusConfig?.reactions === '1' ? '1' : '0'}
            emitMetadata={commentsConfig.giscusConfig?.metadata === '1' ? '1' : '0'}
            inputPosition={commentsConfig.giscusConfig?.inputPosition || 'bottom'}
            theme={commentsTheme}
            lang={commentsConfig.giscusConfig?.lang || 'en'}
            loading="lazy"
          />
        )}
      </motion.div>
    </div>
  )
}

export default Comments
