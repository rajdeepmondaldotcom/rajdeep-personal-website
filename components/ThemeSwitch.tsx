'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const switchTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      type="button"
      className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 shadow-sm transition-all duration-200 hover:bg-gray-200 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={switchTheme}
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: resolvedTheme === 'dark' ? 180 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="h-5 w-5 text-amber-500" />
        ) : (
          <Moon className="h-5 w-5 text-indigo-600" />
        )}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  )
}

export default ThemeSwitch
