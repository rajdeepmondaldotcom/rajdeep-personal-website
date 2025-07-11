'use client'

import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'
import { MessageCircle, ArrowUp } from 'lucide-react'

/**
 * A component that provides floating buttons for scrolling to the top of the
 * page or to the comments section.
 *
 * The buttons appear only after the user has scrolled down a certain amount.
 * The "scroll to comment" button is only rendered if a comment provider is
 * configured in the site metadata.
 *
 * @returns {JSX.Element} The rendered floating button container.
 */
const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    /**
     * Handles the window's scroll event to show or hide the buttons.
     */
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  /**
   * Smoothly scrolls the window to the top of the page.
   */
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /**
   * Smoothly scrolls the window to the comment section, identified by the
   * element with the ID "comment".
   */
  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div
      className={`fixed right-8 bottom-8 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
    >
      {siteMetadata.comments?.provider && (
        <button
          aria-label="Scroll To Comment"
          onClick={handleScrollToComment}
          className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}
      <button
        aria-label="Scroll To Top"
        onClick={handleScrollTop}
        className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  )
}

export default ScrollTopAndComment
