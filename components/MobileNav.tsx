'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const MobileNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Toggle Menu"
          className="group relative h-10 w-10 rounded-xl bg-gray-100/80 p-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-gray-200/80 hover:shadow-md lg:hidden dark:bg-gray-800/80 dark:hover:bg-gray-700/80"
        >
          <div className="from-primary-600/0 group-hover:from-primary-600/10 absolute inset-0 rounded-xl bg-gradient-to-r to-purple-600/0 opacity-0 transition-opacity duration-300 group-hover:to-purple-600/10 group-hover:opacity-100" />
          <div className="relative flex h-full w-full items-center justify-center">
            <Menu className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-fade-in fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm lg:hidden" />
        <Dialog.Content asChild forceMount>
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 right-0 z-[100] h-full w-[300px] overflow-y-auto bg-white/95 shadow-2xl backdrop-blur-md lg:hidden dark:bg-gray-950/95"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200/50 p-6 dark:border-gray-700/50">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Navigation
              </h2>
              <Dialog.Close asChild>
                <button
                  aria-label="Close Menu"
                  className="group h-10 w-10 rounded-xl bg-gray-100/80 p-2 transition-all duration-200 hover:bg-gray-200/80 dark:bg-gray-800/80 dark:hover:bg-gray-700/80"
                >
                  <X className="h-6 w-6 text-gray-700 transition-transform duration-200 group-hover:rotate-90 dark:text-gray-200" />
                </button>
              </Dialog.Close>
            </div>
            {/* Navigation links */}
            <div className="px-6 py-8">
              {headerNavLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  className="mb-4"
                >
                  <Dialog.Close asChild>
                    <Link
                      href={link.href}
                      className="group hover:text-primary-600 dark:hover:text-primary-400 relative flex items-center rounded-xl px-4 py-3 text-lg font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-gray-800/80"
                    >
                      <span className="relative">
                        {link.title}
                        <span className="bg-primary-600 dark:bg-primary-400 absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </Dialog.Close>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MobileNav
