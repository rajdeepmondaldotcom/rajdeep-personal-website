'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import siteMetadata from '@/data/siteMetadata'

/**
 * A newsletter signup form that captures user emails and provides feedback
 * using toast notifications.
 *
 * It features a clean, modern design using `shadcn/ui` components and sends
 * subscription requests to a serverless function.
 *
 * @returns {JSX.Element} The rendered newsletter form.
 */
const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()

    if (!siteMetadata.newsletter?.provider) {
      return
    }

    const res = await fetch(siteMetadata.newsletter.provider, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'There was an error subscribing to the newsletter.')
      toast.error('Failed to subscribe. Please try again.')
      return
    }

    setEmail('')
    setError('')
    setSubscribed(true)
    toast.success('Successfully subscribed!')
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold tracking-tight text-center">
        Subscribe to my newsletter
      </h2>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
        Get the latest updates and articles delivered straight to your inbox.
      </p>
      <form className="mt-4 flex flex-col sm:flex-row gap-2" onSubmit={handleSubscribe}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email for newsletter"
        />
        <Button type="submit" disabled={subscribed}>
          {subscribed ? 'Subscribed!' : 'Subscribe'}
        </Button>
      </form>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default NewsletterForm 