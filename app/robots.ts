import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

/**
 * Generates the `robots.txt` file for the site.
 *
 * This function is used by Next.js to create a `robots.txt` file, which
 * instructs web crawlers on how to index the site. It allows all user agents
 * to crawl the entire site and provides the sitemap URL.
 *
 * @returns {MetadataRoute.Robots} The robots.txt configuration object.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
