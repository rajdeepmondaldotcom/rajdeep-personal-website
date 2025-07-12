import { allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import { Authors } from 'contentlayer/generated'
import { ServiceResponse, AuthorData } from '@/lib/types'
import { AUTHOR, ERROR_MESSAGES } from '@/lib/constants'
import { getPostsByAuthor } from './postService'
import { NotFoundError } from '@/lib/errors'

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
export const getAuthorBySlug = (slug: string): Authors => {
  const author = allAuthors.find((author) => author.slug === slug)

  if (!author) {
    throw new NotFoundError('Author', slug)
  }

  return author
}

/**
 * Get the default author
 */
export const getDefaultAuthor = (): Authors => {
  return getAuthorBySlug(AUTHOR.DEFAULT_SLUG)
}

/**
 * Get author with their posts
 */
export const getAuthorWithPosts = (slug: string): AuthorData => {
  const author = getAuthorBySlug(slug)
  const posts = getPostsByAuthor(slug)

  return {
    ...coreContent(author),
    posts,
  } as AuthorData
}

/**
 * Get authors for a list of slugs
 */
export const getAuthorsBySlugList = (slugs: string[]): Authors[] => {
  return slugs
    .map((slug) => {
      try {
        return getAuthorBySlug(slug)
      } catch {
        return null
      }
    })
    .filter((author): author is Authors => author !== null)
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
