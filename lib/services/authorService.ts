import { allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import { Authors } from 'contentlayer/generated'
import { ServiceResponse, AuthorData } from '@/lib/types'
import { AUTHOR, ERROR_MESSAGES } from '@/lib/constants'
import { getPostsByAuthor } from './postService'

/**
 * Service layer for author operations
 * Centralizes all author data fetching and processing logic
 */

/**
 * Get all authors
 */
export const getAllAuthors = () => {
  return allAuthors.map((author) => coreContent(author))
}

/**
 * Get author by slug
 */
export const getAuthorBySlug = (slug: string): ServiceResponse<Authors> => {
  try {
    const author = allAuthors.find((a) => a.slug === slug)

    if (!author) {
      return {
        error: {
          message: `Author with slug '${slug}' not found`,
          code: 'AUTHOR_NOT_FOUND',
        },
      }
    }

    return { data: author }
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
    }
  }
}

/**
 * Get the default author
 */
export const getDefaultAuthor = (): ServiceResponse<Authors> => {
  return getAuthorBySlug(AUTHOR.DEFAULT_SLUG)
}

/**
 * Get author with their posts
 */
export const getAuthorWithPosts = (slug: string): ServiceResponse<AuthorData> => {
  const authorResponse = getAuthorBySlug(slug)

  if (authorResponse.error) {
    return authorResponse
  }

  const author = authorResponse.data!
  const posts = getPostsByAuthor(slug)

  return {
    data: {
      ...coreContent(author),
      posts,
    },
  }
}

/**
 * Get authors for a list of slugs
 */
export const getAuthorsBySlugList = (slugs: string[]): Authors[] => {
  return slugs
    .map((slug) => getAuthorBySlug(slug))
    .filter((response) => response.data)
    .map((response) => response.data!)
}

/**
 * Check if an author exists
 */
export const authorExists = (slug: string): boolean => {
  return allAuthors.some((author) => author.slug === slug)
}

/**
 * Get author details for blog posts
 */
export const getAuthorDetailsForPost = (authorSlugs?: string[]) => {
  const slugs = authorSlugs || [AUTHOR.DEFAULT_SLUG]

  return slugs
    .map((slug) => {
      const author = allAuthors.find((a) => a.slug === slug)
      return author ? coreContent(author) : null
    })
    .filter(Boolean)
}
