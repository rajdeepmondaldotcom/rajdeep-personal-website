'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { Menu, X } from 'lucide-react'
import { useScrollLock } from '@/lib/hooks'
import { COMMON_STYLES, UI } from '@/lib/constants'

/**
 * Mobile Navigation Component
 * Provides a hamburger menu for mobile devices with scroll lock
 */
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { lockScroll, unlockScroll } = useScrollLock()

  const handleToggle = () => {
    if (!isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    unlockScroll()
    setIsOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="mr-1 ml-1 h-8 w-8 rounded md:hidden"
        aria-label="Toggle Menu"
        onClick={handleToggle}
      >
        <Menu className="h-6 w-6" />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={handleClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="fixed top-0 right-0 z-50 h-full w-full bg-white p-4 duration-300 sm:w-96 sm:p-6 dark:bg-gray-950">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Navigation</h2>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded"
                    onClick={handleClose}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="mt-8">
                  <div className="space-y-2">
                    {headerNavLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="block rounded px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                        onClick={handleClose}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </nav>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
