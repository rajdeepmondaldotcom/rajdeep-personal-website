import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

/**
 * The main page for the blog, displaying a paginated list of all posts.
 *
 * This component fetches all blog posts, calculates the necessary pagination,
 * and renders the initial list of posts using the `ListLayout`.
 *
 * @param {object} props - The properties for the component.
 * @param {Promise<{ page: string }>} props.searchParams - The search parameters, used for pagination.
 * @returns {Promise<JSX.Element>} A promise that resolves to the rendered blog page.
 */
export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
