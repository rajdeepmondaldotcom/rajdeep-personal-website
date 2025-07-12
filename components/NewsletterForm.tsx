'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { UI } from '@/lib/constants'

interface NewsletterFormProps {
  title?: string
  apiUrl?: string
}

const NewsletterForm = ({
  title = 'Subscribe to the newsletter',
  apiUrl = '/api/newsletter',
}: NewsletterFormProps) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const subscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const responseData = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to subscribe')
      }

      setEmail('')
      setIsSuccess(true)
      toast.success('Successfully subscribed! 🎉')

      // Reset success state after timeout
      setTimeout(() => setIsSuccess(false), UI.NEWSLETTER_SUCCESS_TIMEOUT)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="from-primary-600/10 absolute inset-0 bg-gradient-to-r via-purple-600/10 to-pink-600/10 blur-3xl" />

      <div className="relative rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/80">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="from-primary-600 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br to-purple-600 shadow-lg"
            >
              <Mail className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get notified about new posts and updates
            </p>
          </div>

          {/* Form */}
          <form onSubmit={subscribe} className="space-y-4">
            <div className="relative">
              <input
                ref={inputEl}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || isSuccess}
                className={`focus:border-primary-600 focus:ring-primary-600/10 w-full rounded-xl border bg-white px-4 py-3 pl-12 text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 ${
                  isSuccess
                    ? 'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/10'
                    : 'border-gray-300 dark:border-gray-600'
                } `}
              />
              <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mail"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Mail className="h-5 w-5 text-gray-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || isSuccess || !email}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full rounded-xl px-4 py-3 font-medium text-white shadow-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                isSuccess
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
                  : 'from-primary-600 hover:from-primary-700 bg-gradient-to-r to-purple-600 hover:to-purple-700'
              } `}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Subscribing...</span>
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Successfully subscribed!</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="subscribe"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    Subscribe
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* Privacy note */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NewsletterForm
