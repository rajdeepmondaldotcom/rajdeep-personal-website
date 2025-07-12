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

const newsletterProvider = siteMetadata.newsletter?.provider

const handler = newsletterProvider 
  ? NewsletterAPI({
      provider: newsletterProvider as 
        | 'buttondown' 
        | 'convertkit' 
        | 'klaviyo' 
        | 'mailchimp' 
        | 'emailoctopus' 
        | 'beehiiv',
    })
  : NewsletterAPI({ provider: 'mailchimp' }) // Default provider

export { handler as GET, handler as POST }
