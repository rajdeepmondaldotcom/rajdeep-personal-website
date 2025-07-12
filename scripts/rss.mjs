import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' with { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

const outputFolder = process.env.EXPORT ? 'out' : 'public'

/**
 * Generates an XML `<item>` block for a single blog post.
 *
 * @param {object} config - The site metadata configuration.
 * @param {object} post - The post object to be included in the RSS item.
 * @returns {string} An XML string representing a single RSS item.
 */
const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title || '')}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary ? `<description>${escape(post.summary)}</description>` : ''}
    <pubDate>${new Date(post.date || new Date()).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags ? post.tags.map((tag) => `<category>${tag}</category>`).join('') : ''}
  </item>
`

/**
 * Generates the complete RSS feed XML structure.
 *
 * @param {object} config - The site metadata configuration.
 * @param {object[]} posts - An array of post objects to include in the feed.
 * @param {string} [page='feed.xml'] - The filename for the generated RSS feed.
 * @returns {string} An XML string representing the complete RSS feed.
 */
const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${posts[0] && posts[0].date ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`

/**
 * Generates and writes RSS feeds for the main blog and for each individual tag.
 *
 * This function filters out draft posts, generates a main RSS feed, and then
 * creates a separate RSS feed for each tag, saving them to the appropriate
 * directories.
 *
 * @param {object} config - The site metadata configuration.
 * @param {object[]} allBlogs - An array of all blog post objects.
 * @param {string} [page='feed.xml'] - The base filename for the generated RSS feeds.
 * @returns {Promise<void>} A promise that resolves when all RSS feeds have been written.
 */
async function generateRSS(config, allBlogs, page = 'feed.xml') {
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  // RSS for blog post
  if (publishPosts.length > 0) {
    const rss = generateRss(config, sortPosts(publishPosts))
    writeFileSync(`./${outputFolder}/${page}`, rss)
  }

  if (publishPosts.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = allBlogs.filter(
        (post) => post.tags && post.tags.map((postTag) => slug(postTag)).includes(tag)
      )
      const rss = generateRss(config, filteredPosts, `tags/${tag}/${page}`)
      const rssPath = path.join(outputFolder, 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, page), rss)
    }
  }
}

/**
 * The main function to trigger the generation of all RSS feeds.
 *
 * It calls `generateRSS` with the site metadata and all blog posts, and logs
 * a message to the console upon completion.
 */
const rss = () => {
  void generateRSS(siteMetadata, allBlogs)
  console.log('RSS feed generated...')
}
export default rss
