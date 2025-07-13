'use client'

import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
    },
    open: {
      opacity: 1,
      x: 0,
    },
  }

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.4,
      },
    }),
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="group relative h-10 w-10 rounded-xl bg-gray-100/80 p-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-gray-200/80 hover:shadow-md lg:hidden dark:bg-gray-800/80 dark:hover:bg-gray-700/80"
      >
        <div className="from-primary-600/0 group-hover:from-primary-600/10 absolute inset-0 rounded-xl bg-gradient-to-r to-purple-600/0 opacity-0 transition-opacity duration-300 group-hover:to-purple-600/10 group-hover:opacity-100" />
        <div className="relative flex h-full w-full items-center justify-center">
          <AnimatePresence mode="wait">
            {navShow ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {navShow && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onToggleNav}
              className="fixed inset-0 z-60 bg-black/20 backdrop-blur-sm lg:hidden"
            />

            {/* Menu panel */}
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 z-70 h-full w-[300px] overflow-y-auto bg-white/95 shadow-2xl backdrop-blur-md lg:hidden dark:bg-gray-950/95"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200/50 p-6 dark:border-gray-700/50">
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  Navigation
                </h2>
                <button
                  onClick={onToggleNav}
                  aria-label="Close Menu"
                  className="group h-10 w-10 rounded-xl bg-gray-100/80 p-2 transition-all duration-200 hover:bg-gray-200/80 dark:bg-gray-800/80 dark:hover:bg-gray-700/80"
                >
                  <X className="h-6 w-6 text-gray-700 transition-transform duration-200 group-hover:rotate-90 dark:text-gray-200" />
                </button>
              </div>

              {/* Navigation links */}
              <div className="px-6 py-8">
                {headerNavLinks.map((link, index) => (
                  <motion.div
                    key={link.title}
                    custom={index}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    className="mb-4"
                  >
                    <Link
                      href={link.href}
                      onClick={onToggleNav}
                      className="group hover:text-primary-600 dark:hover:text-primary-400 relative flex items-center rounded-xl px-4 py-3 text-lg font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-gray-800/80"
                    >
                      <span className="relative">
                        {link.title}
                        <span className="bg-primary-600 dark:bg-primary-400 absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="absolute right-0 bottom-0 left-0 border-t border-gray-200/50 p-6 dark:border-gray-700/50">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  © 2025 Rajdeep Mondal
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// export default MobileNav // REMOVE EXPORT to disable usage
