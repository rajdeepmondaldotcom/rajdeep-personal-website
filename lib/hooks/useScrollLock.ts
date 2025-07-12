import { useEffect, useRef } from 'react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { UseScrollLockReturn } from '@/lib/types'

/**
 * Custom hook to manage body scroll locking
 * Useful for modals, mobile menus, and overlays
 */
export const useScrollLock = (): UseScrollLockReturn => {
  const scrollRef = useRef<HTMLElement | null>(null)

  const lockScroll = (element?: HTMLElement) => {
    const targetElement = element || document.body
    scrollRef.current = targetElement
    disableBodyScroll(targetElement)
  }

  const unlockScroll = () => {
    if (scrollRef.current) {
      enableBodyScroll(scrollRef.current)
      scrollRef.current = null
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [])

  return { lockScroll, unlockScroll }
}
