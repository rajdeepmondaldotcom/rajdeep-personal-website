import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog, Authors } from 'contentlayer/generated'

/**
 * Common Types and Interfaces
 * Centralized type definitions for the entire application
 */

// Navigation
export interface NavigationItem {
  href: string
  title: string
}

// Pagination
export interface PaginationProps {
  currentPage: number
  totalPages: number
}

// Post Navigation
export interface PostNavigation {
  path: string
  title: string
}

// Layout Props
export interface BaseLayoutProps {
  children: React.ReactNode
}

export interface PostLayoutProps extends BaseLayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  nextPost?: PostNavigation
  previousPost?: PostNavigation
}

export interface SimplePostLayoutProps extends BaseLayoutProps {
  content: CoreContent<Blog>
  nextPost?: PostNavigation
  previousPost?: PostNavigation
}

export interface AuthorLayoutProps extends BaseLayoutProps {
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

// Component Props
export interface HomePageProps {
  posts: CoreContent<Blog>[]
  author: Authors
}

export interface SearchProps {
  searchValue: string
  onSearchChange: (value: string) => void
}

export interface TagProps {
  text: string
}

export interface PageTitleProps {
  children: React.ReactNode
}

export interface SectionContainerProps {
  children: React.ReactNode
}

export interface LayoutWrapperProps {
  children: React.ReactNode
}

// API Response Types
export interface TagCount {
  [key: string]: number
}

// SEO Types
export interface PageSEOProps {
  title: string
  description?: string
  image?: string
  [key: string]: any
}

// Form Types
export interface NewsletterFormData {
  email: string
}

export interface NewsletterResponse {
  success: boolean
  error?: string
  message?: string
}

// Error Types
export interface ErrorInfo {
  message: string
  code?: string
  stack?: string
}

// Service Response Types
export interface ServiceResponse<T> {
  data?: T
  error?: ErrorInfo
  loading?: boolean
}

// Author Service Types
export interface AuthorData extends CoreContent<Authors> {
  posts?: CoreContent<Blog>[]
}

// Post Service Types
export interface PostFilters {
  tag?: string
  author?: string
  draft?: boolean
}

export interface PostWithMetadata extends CoreContent<Blog> {
  readingTime: {
    text: string
    minutes: number
    words: number
  }
}

// UI State Types
export interface UIState {
  isMenuOpen: boolean
  isSearchOpen: boolean
  theme: 'light' | 'dark' | 'system'
}

// Hook Return Types
export interface UseReadingProgressReturn {
  percentageRead: number
  estimatedMinutesLeft: number
  topBarScaleX: any // MotionValue<number>
  circularProgressColor: any // MotionValue<string>
  circularProgressColorDark: any // MotionValue<string>
  scrollYProgress: any // MotionValue<number>
}

export interface UseScrollLockReturn {
  lockScroll: () => void
  unlockScroll: () => void
}

// Config Types
export interface SiteConfig {
  title: string
  author: string
  description: string
  siteUrl: string
  socialLinks: {
    github?: string
    twitter?: string
    linkedin?: string
    email?: string
  }
}

// Structured Data Types
export interface StructuredData {
  '@context': string
  '@type': string
  headline?: string
  datePublished?: string
  dateModified?: string
  description?: string
  image?: string | string[]
  url?: string
  author?: {
    '@type': string
    name: string
  }[]
}
