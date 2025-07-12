import { slug } from 'github-slugger'
import { TagCount } from '@/lib/types'
import { getPostsByTag, getAllPosts } from './postService'
import { PAGINATION } from '@/lib/constants'
import tagData from 'app/tag-data.json'

/**
 * Service layer for tag operations
 * Centralizes all tag data fetching and processing logic
 */

/**
 * Get all tag counts
 */
export const getTagCounts = (): TagCount => {
  return tagData as TagCount
}

/**
 * Get sorted tags by count
 */
export const getSortedTags = (): string[] => {
  const tagCounts = getTagCounts()
  const tagKeys = Object.keys(tagCounts)

  return tagKeys.sort((firstTag, secondTag) => tagCounts[secondTag] - tagCounts[firstTag])
}

/**
 * Get tag with formatted title
 */
export const formatTagTitle = (tag: string): string => {
  return tag.charAt(0).toUpperCase() + tag.split(' ').join('-').slice(1)
}

/**
 * Get posts for a specific tag with pagination
 */
export const getPaginatedPostsByTag = (tag: string, page: number = 1) => {
  const posts = getPostsByTag(tag)
  const totalPages = Math.ceil(posts.length / PAGINATION.POSTS_PER_PAGE)

  const startIndex = (page - 1) * PAGINATION.POSTS_PER_PAGE
  const endIndex = startIndex + PAGINATION.POSTS_PER_PAGE

  return {
    posts: posts.slice(startIndex, endIndex),
    totalPosts: posts.length,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}

/**
 * Get all unique tags from posts
 */
export const getAllUniqueTags = (): string[] => {
  const posts = getAllPosts()
  const tagSet = new Set<string>()

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagSet.add(slug(tag))
    })
  })

  return Array.from(tagSet)
}

/**
 * Check if a tag exists
 */
export const tagExists = (tag: string): boolean => {
  const tagCounts = getTagCounts()
  return slug(tag) in tagCounts
}

/**
 * Get related tags based on co-occurrence
 */
export const getRelatedTags = (tag: string, limit: number = 5): string[] => {
  const posts = getPostsByTag(tag)
  const relatedTagCounts: Record<string, number> = {}

  posts.forEach((post) => {
    post.tags?.forEach((postTag) => {
      const sluggedTag = slug(postTag)
      if (sluggedTag !== slug(tag)) {
        relatedTagCounts[sluggedTag] = (relatedTagCounts[sluggedTag] || 0) + 1
      }
    })
  })

  return Object.entries(relatedTagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tag]) => tag)
}

/**
 * Get tag statistics
 */
export const getTagStatistics = () => {
  const tagCounts = getTagCounts()
  const tags = Object.entries(tagCounts)

  return {
    totalTags: tags.length,
    totalTaggedPosts: tags.reduce((sum, [, count]) => sum + count, 0),
    averagePostsPerTag:
      tags.length > 0 ? tags.reduce((sum, [, count]) => sum + count, 0) / tags.length : 0,
    mostUsedTag:
      tags.length > 0
        ? tags.reduce((max, current) => (current[1] > max[1] ? current : max))[0]
        : null,
    leastUsedTag:
      tags.length > 0
        ? tags.reduce((min, current) => (current[1] < min[1] ? current : min))[0]
        : null,
  }
}
