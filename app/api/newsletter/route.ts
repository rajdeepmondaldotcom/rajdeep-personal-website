/**
 * An API route for handling newsletter subscriptions.
 *
 * This file uses the `NewsletterAPI` from the `pliny` library to create
 * API endpoints for subscribing users to a newsletter. The specific provider
 * (e.g., Mailchimp, Buttondown) is determined by the `siteMetadata.newsletter.provider`
 * configuration. It exports both GET and POST handlers.
 */
import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

const handler = NewsletterAPI({
  // @ts-ignore
  provider: siteMetadata.newsletter.provider,
})

export { handler as GET, handler as POST }
