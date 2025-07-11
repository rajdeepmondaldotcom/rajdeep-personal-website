'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      type="button"
      className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1, rotate: resolvedTheme === 'dark' ? 90 : -90 }}
      whileFocus={{ scale: 1.1, rotate: resolvedTheme === 'dark' ? 90 : -90 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5 text-orange-300" />
      ) : (
        <Moon className="h-5 w-5 text-slate-800" />
      )}
    </motion.button>
  )
}

export default ThemeSwitch
