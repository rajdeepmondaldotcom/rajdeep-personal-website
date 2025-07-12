'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { isValidEmail, sanitizeInput } from '@/lib/utils/validation'
import { LoadingSpinner } from '@/components/ui/loading'
import { ERROR_MESSAGES } from '@/lib/constants'

interface NewsletterFormProps {
  title?: string
  description?: string
}

/**
 * Newsletter Subscription Form Component
 * Handles email collection with validation and API submission
 */
export default function NewsletterForm({
  title = 'Subscribe to my newsletter',
  description = "I'll only send emails when new content is posted. No spam.",
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validate email
    const sanitizedEmail = sanitizeInput(email)
    if (!isValidEmail(sanitizedEmail)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: sanitizedEmail }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      toast.success('Successfully subscribed! 🎉')
      setEmail('')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'

      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{description}</p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isLoading}
          aria-label="Email address"
          className="flex-1"
        />

        <Button type="submit" disabled={isLoading} className="min-w-[100px]">
          {isLoading ? <LoadingSpinner size="sm" /> : 'Subscribe'}
        </Button>
      </form>
    </div>
  )
}
