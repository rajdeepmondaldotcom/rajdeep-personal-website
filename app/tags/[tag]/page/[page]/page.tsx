import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE_LIMIT = 5

/**
 * Generates static parameters for paginated tag pages.
 *
 * This function creates all possible combinations of tags and page numbers
 * to pre-render every paginated tag page at build time.
 *
 * @returns {Promise<{ tag: string; page: string }[]>} A promise that resolves to an array of parameter objects.
 */
export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  return Object.keys(tagCounts).flatMap((tag) => {
    const postCount = tagCounts[tag]
    const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE_LIMIT))
    return Array.from({ length: totalPages }, (_, i) => ({
      tag: encodeURI(tag),
      page: (i + 1).toString(),
    }))
  })
}

/**
 * The page component for displaying a paginated list of posts for a specific tag.
 *
 * It filters posts by the given tag, calculates the correct posts to display
 * for the current page number, and renders them using the `ListLayout`.
 *
 * @param {object} props - The properties for the component.
 * @param {Promise<{ tag: string; page: string }>} props.params - The route parameters, containing the tag and page number.
 * @returns {Promise<JSX.Element>} A promise that resolves to the rendered page or a 404 error if the page is invalid.
 */
export default async function TagPage(props: { params: Promise<{ tag: string; page: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const pageNumber = parseInt(params.page)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.tags && post.tags.map((tagItem) => slug(tagItem)).includes(tag)
      )
    )
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE_LIMIT)

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE_LIMIT * (pageNumber - 1),
    POSTS_PER_PAGE_LIMIT * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
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
