/**
 * Factory Pattern Implementations
 * Provides consistent object creation interfaces
 */

import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog, Authors } from 'contentlayer/generated'
import {
  PostLayoutProps,
  SimplePostLayoutProps,
  ListLayoutProps,
  PageSEOProps,
  StructuredData,
} from '@/lib/types'
import { PaginatedResponse, ApiResponse, ApiError } from '@/lib/types/api'
import siteMetadata from '@/data/siteMetadata'
import { formatISODate } from '@/lib/utils/formatting'

/**
 * Factory for creating layout props
 */
export class LayoutPropsFactory {
  /**
   * Create props for post layout
   */
  static createPostLayoutProps(
    post: CoreContent<Blog>,
    authorDetails: CoreContent<Authors>[],
    nextPost?: { path: string; title: string },
    previousPost?: { path: string; title: string }
  ): Omit<PostLayoutProps, 'children'> {
    return {
      content: post,
      authorDetails,
      nextPost,
      previousPost,
    }
  }

  /**
   * Create props for simple post layout
   */
  static createSimplePostLayoutProps(
    post: CoreContent<Blog>,
    nextPost?: { path: string; title: string },
    previousPost?: { path: string; title: string }
  ): Omit<SimplePostLayoutProps, 'children'> {
    return {
      content: post,
      nextPost,
      previousPost,
    }
  }

  /**
   * Create props for list layout
   */
  static createListLayoutProps(
    posts: CoreContent<Blog>[],
    title: string,
    page?: number,
    totalPages?: number
  ): ListLayoutProps {
    const props: ListLayoutProps = {
      posts,
      title,
    }

    if (page !== undefined && totalPages !== undefined) {
      props.pagination = {
        currentPage: page,
        totalPages,
      }
    }

    return props
  }
}

/**
 * Factory for creating SEO metadata
 */
export class SEOFactory {
  /**
   * Create page SEO props
   */
  static createPageSEO(options: {
    title: string
    description?: string
    image?: string
    canonical?: string
    noindex?: boolean
  }): PageSEOProps {
    return {
      title: options.title,
      description: options.description || siteMetadata.description,
      image: options.image || siteMetadata.socialBanner,
      canonical: options.canonical,
      noindex: options.noindex || false,
      openGraph: {
        title: options.title,
        description: options.description || siteMetadata.description,
        images: [
          {
            url: options.image || siteMetadata.socialBanner,
            alt: options.title,
          },
        ],
        locale: siteMetadata.locale,
        type: 'website',
        siteName: siteMetadata.title,
      },
      twitter: {
        card: 'summary_large_image',
        title: options.title,
        description: options.description || siteMetadata.description,
        images: [options.image || siteMetadata.socialBanner],
      },
    }
  }

  /**
   * Create structured data for blog posts
   */
  static createBlogStructuredData(post: Blog, authors: Array<{ name: string }>): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: formatISODate(post.date),
      dateModified: formatISODate(post.lastmod || post.date),
      description: post.summary,
      image: post.images?.[0] || siteMetadata.socialBanner,
      url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
      author: authors.map((author) => ({
        '@type': 'Person',
        name: author.name,
      })),
    }
  }
}

/**
 * Factory for creating API responses
 */
export class ApiResponseFactory {
  /**
   * Create successful API response
   */
  static success<T>(data: T, meta?: Record<string, unknown>): ApiResponse<T> {
    return {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        ...meta,
      },
    }
  }

  /**
   * Create error API response
   */
  static error(
    code: string,
    message: string,
    details?: Record<string, unknown>
  ): ApiResponse<never> {
    const error: ApiError = {
      code,
      message,
      details,
      timestamp: new Date().toISOString(),
    }

    return {
      success: false,
      error,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      },
    }
  }

  /**
   * Create paginated API response
   */
  static paginated<T>(
    items: T[],
    page: number,
    limit: number,
    total: number
  ): ApiResponse<PaginatedResponse<T>> {
    const totalPages = Math.ceil(total / limit)

    return {
      success: true,
      data: {
        items,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrevious: page > 1,
        },
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      },
    }
  }
}

/**
 * Factory for creating error objects
 */
export class ErrorFactory {
  /**
   * Create validation error
   */
  static validation(field: string, message: string): ApiError {
    return {
      code: 'VALIDATION_ERROR',
      message: `Validation failed for field: ${field}`,
      details: {
        field,
        message,
      },
      timestamp: new Date().toISOString(),
    }
  }

  /**
   * Create not found error
   */
  static notFound(resource: string, id?: string): ApiError {
    return {
      code: 'NOT_FOUND',
      message: id ? `${resource} with id '${id}' not found` : `${resource} not found`,
      timestamp: new Date().toISOString(),
    }
  }

  /**
   * Create unauthorized error
   */
  static unauthorized(message: string = 'Unauthorized access'): ApiError {
    return {
      code: 'UNAUTHORIZED',
      message,
      timestamp: new Date().toISOString(),
    }
  }

  /**
   * Create rate limit error
   */
  static rateLimit(retryAfter?: number): ApiError {
    return {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests',
      details: retryAfter ? { retryAfter } : undefined,
      timestamp: new Date().toISOString(),
    }
  }
}
