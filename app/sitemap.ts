import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

/**
 * Generates the `sitemap.xml` file for the site.
 *
 * This function is used by Next.js to create a sitemap, which helps search
 * engines discover and index the site's pages. It includes all non-draft
 * blog posts and the main static routes.
 *
 * @returns {MetadataRoute.Sitemap} An array of sitemap entry objects.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
