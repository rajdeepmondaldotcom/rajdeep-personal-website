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
    H1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-50 dark:to-gray-300',
    H2: 'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50',
    H3: 'text-2xl sm:text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100',
  },
  TEXT: {
    MUTED: 'text-gray-600 dark:text-gray-400 text-lg',
    PRIMARY:
      'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors',
  },
  LAYOUT: {
    SECTION_PADDING: 'pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24',
    CARD_SPACING: 'space-y-4 xl:space-y-0',
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
