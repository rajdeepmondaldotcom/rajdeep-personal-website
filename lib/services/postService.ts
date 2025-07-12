import { allBlogs } from 'contentlayer/generated'
import { sortPosts, allCoreContent, coreContent } from 'pliny/utils/contentlayer'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { PostFilters, ServiceResponse } from '@/lib/types'
import { PAGINATION, ERROR_MESSAGES } from '@/lib/constants'
import { NotFoundError, ValidationError, withErrorBoundary } from '@/lib/errors'

/**
 * Service layer for blog post operations
 * Centralizes all blog post data fetching and processing logic
 */

/**
 * Get all published blog posts
 */
export const getAllPosts = (): CoreContent<Blog>[] => {
  const posts = isProduction() ? allBlogs.filter((post) => !post.draft) : allBlogs

  return allCoreContent(sortPosts(posts))
}

/**
 * Get a single blog post by slug
 */
export const getPostBySlug = (slugParam: string): Blog => {
  const post = allBlogs.find((post) => post.slug === slugParam)

  if (!post) {
    throw new NotFoundError('Blog post', slugParam)
  }

  return post
}

/**
 * Get posts with pagination
 */
export const getPaginatedPosts = (page: number = PAGINATION.DEFAULT_PAGE) => {
  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / PAGINATION.POSTS_PER_PAGE)

  const startIndex = (page - 1) * PAGINATION.POSTS_PER_PAGE
  const endIndex = startIndex + PAGINATION.POSTS_PER_PAGE

  return {
    posts: allPosts.slice(startIndex, endIndex),
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}

/**
 * Get posts filtered by tag
 */
export const getPostsByTag = (tag: string): CoreContent<Blog>[] => {
  const posts = getAllPosts()

  return posts.filter((post) => post.tags?.some((postTag) => slug(postTag) === slug(tag)))
}

/**
 * Get posts filtered by author
 */
export const getPostsByAuthor = (authorSlug: string): CoreContent<Blog>[] => {
  const posts = getAllPosts()

  return posts.filter((post) => post.authors?.includes(authorSlug))
}

/**
 * Calculate shared tags between two posts
 */
const calculateSharedTags = (post1: CoreContent<Blog>, post2: CoreContent<Blog>): number => {
  if (!post1.tags || !post2.tags) {
    return 0
  }
  return post1.tags.filter((tag) => post2.tags?.includes(tag)).length
}

/**
 * Score posts by relevance to current post
 */
const scorePostsByRelevance = (
  posts: CoreContent<Blog>[],
  currentPost: CoreContent<Blog>
): Array<{ post: CoreContent<Blog>; score: number }> => {
  return posts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => ({
      post,
      score: calculateSharedTags(post, currentPost),
    }))
    .filter((item) => item.score > 0)
}

/**
 * Get related posts based on tags
 */
export const getRelatedPosts = (
  currentPost: CoreContent<Blog>,
  limit: number = 3
): CoreContent<Blog>[] => {
  if (!currentPost.tags || currentPost.tags.length === 0) {
    return []
  }

  const posts = getAllPosts()
  const scoredPosts = scorePostsByRelevance(posts, currentPost)

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
}

/**
 * Get post navigation (previous and next posts)
 */
export const getPostNavigation = (currentSlug: string) => {
  const posts = getAllPosts()
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug)

  if (currentIndex === -1) {
    return { previousPost: undefined, nextPost: undefined }
  }

  const previousPost = posts[currentIndex + 1]
  const nextPost = posts[currentIndex - 1]

  return {
    previousPost: previousPost
      ? {
          path: previousPost.path,
          title: previousPost.title,
        }
      : undefined,
    nextPost: nextPost
      ? {
          path: nextPost.path,
          title: nextPost.title,
        }
      : undefined,
  }
}

/**
 * Search posts by query
 */
export const searchPosts = (query: string): CoreContent<Blog>[] => {
  if (!query.trim()) {
    return []
  }

  const posts = getAllPosts()
  const lowercaseQuery = query.toLowerCase()

  return posts.filter((post) => {
    const searchableContent = `
      ${post.title} 
      ${post.summary || ''} 
      ${post.tags?.join(' ') || ''}
    `.toLowerCase()

    return searchableContent.includes(lowercaseQuery)
  })
}

/**
 * Check if running in production
 */
const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production'
}
