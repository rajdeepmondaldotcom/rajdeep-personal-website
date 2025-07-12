/**
 * Application-wide constants
 * Centralized location for all magic strings, numbers, and configuration values
 */

// Pagination
export const PAGINATION = {
  POSTS_PER_PAGE: 5,
  DEFAULT_PAGE: 1,
} as const

// Content Types
export const CONTENT_TYPES = {
  BLOG: 'Blog',
  AUTHORS: 'Authors',
} as const

// Layout Types
export const LAYOUT_TYPES = {
  POST_SIMPLE: 'PostSimple',
  POST_LAYOUT: 'PostLayout',
  POST_BANNER: 'PostBanner',
  DEFAULT: 'PostLayout',
} as const

// Routes
export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  ABOUT: '/about',
  PROJECTS: '/projects',
  TAGS: '/tags',
} as const

// Author
export const AUTHOR = {
  DEFAULT_SLUG: 'default',
} as const

// SEO
export const SEO = {
  TITLE_TEMPLATE: '%s | ',
  DEFAULT_LOCALE: 'en-US',
  TWITTER_CARD_TYPE: 'summary_large_image',
  OG_TYPE: 'website',
} as const

// UI
export const UI = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  WORDS_PER_MINUTE: 200,
} as const

// Date Formats
export const DATE_FORMATS = {
  POST_DATE: {
    weekday: 'long' as const,
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
  },
} as const

// File Paths
export const FILE_PATHS = {
  TAG_DATA: './app/tag-data.json',
  SEARCH_INDEX: 'search.json',
} as const

// Error Messages
export const ERROR_MESSAGES = {
  AUTHOR_NOT_FOUND: 'Default author not found',
  POST_NOT_FOUND: 'Blog post not found',
  INVALID_PAGE: 'Invalid page number',
} as const

// Validation
export const VALIDATION = {
  MIN_PAGE_NUMBER: 1,
} as const

// CSS Classes
export const COMMON_STYLES = {
  PROSE: 'prose dark:prose-invert max-w-none',
  HEADING: {
    H1: 'text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100',
    H2: 'text-2xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-100',
    H3: 'text-xl leading-7 font-bold tracking-tight',
  },
  TEXT: {
    MUTED: 'text-gray-500 dark:text-gray-400',
    PRIMARY: 'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400',
  },
  LAYOUT: {
    SECTION_PADDING: 'pt-6 pb-8 md:pt-8 md:pb-12',
    CARD_SPACING: 'space-y-2 xl:space-y-0',
  },
} as const

// Content Security Policy
export const CSP_DIRECTIVES = {
  DEFAULT_SRC: ["'self'"],
  SCRIPT_SRC: ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'giscus.app', 'analytics.umami.is'],
  STYLE_SRC: ["'self'", "'unsafe-inline'"],
  IMG_SRC: ['*', 'blob:', 'data:'],
  MEDIA_SRC: ['*.s3.amazonaws.com'],
  CONNECT_SRC: ['*'],
  FONT_SRC: ["'self'"],
  FRAME_SRC: ['giscus.app'],
} as const
