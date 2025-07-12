import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { generatePageMetadata } from 'app/seo'
import { Metadata } from 'next'

const POSTS_PER_PAGE_LIMIT = 5

/**
 * Generates metadata for a specific tag page.
 *
 * This function creates the title, description, and other metadata for a page
 * that lists all blog posts associated with a given tag.
 *
 * @param {object} props - The properties for the function.
 * @param {Promise<{ tag: string }>} props.params - The route parameters, containing the tag.
 * @returns {Promise<Metadata>} A promise that resolves to the metadata object.
 */
export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return generatePageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

/**
 * Generates static parameters for all tag pages.
 *
 * This function is used by Next.js to pre-render all tag pages at build time.
 * It returns an array of all possible tag parameters.
 *
 * @returns {Promise<{ tag: string }[]>} A promise that resolves to an array of tag parameter objects.
 */
export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  return tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
}

/**
 * The page component for displaying posts filtered by a specific tag.
 *
 * It filters all posts to find those that include the given tag, then renders
 * them in a paginated list using the `ListLayout`.
 *
 * @param {object} props - The properties for the component.
 * @param {Promise<{ tag: string }>} props.params - The route parameters, containing the tag.
 * @returns {Promise<JSX.Element>} A promise that resolves to the rendered tag page.
 */
export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.tags && post.tags.map((tagItem) => slug(tagItem)).includes(tag)
      )
    )
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE_LIMIT)
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE_LIMIT)
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  )
}
