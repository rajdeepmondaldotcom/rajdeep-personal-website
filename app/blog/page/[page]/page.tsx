import ListLayout from '@/layouts/ListLayoutWithTags'
import { getPaginatedPosts, getAllPosts } from '@/lib/services'
import { isValidPageNumber, calculateTotalPages } from '@/lib/utils/pagination'
import { notFound } from 'next/navigation'

/**
 * Generate static params for all blog page numbers
 */
export const generateStaticParams = async () => {
  const allPosts = getAllPosts()
  const totalPages = calculateTotalPages(allPosts.length)

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

/**
 * Paginated Blog Posts Page
 * Displays blog posts for a specific page number
 */
export default async function BlogPagePaginated(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const pageNumber = parseInt(params.page)

  // Validate page number
  const allPosts = getAllPosts()
  const totalPages = calculateTotalPages(allPosts.length)

  if (!isValidPageNumber(pageNumber, totalPages)) {
    return notFound()
  }

  // Get paginated posts
  const { posts } = getPaginatedPosts(pageNumber)

  const pagination = {
    currentPage: pageNumber,
    totalPages,
  }

  return (
    <ListLayout
      posts={allPosts}
      initialDisplayPosts={posts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
