import ListLayout from '@/layouts/ListLayout'
import { getPaginatedPosts } from '@/lib/services'
import { generatePageMetadata } from 'app/seo'
import { PAGINATION } from '@/lib/constants'

export const metadata = generatePageMetadata({ title: 'Blog' })

/**
 * Blog Listing Page
 * Displays all blog posts with pagination
 */
export default function BlogPage() {
  const { posts, totalPages } = getPaginatedPosts(PAGINATION.DEFAULT_PAGE)

  const pagination = {
    currentPage: PAGINATION.DEFAULT_PAGE,
    totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={posts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
