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
  NEWSLETTER_SUCCESS_TIMEOUT: 5000,
  TOAST_DURATION: 4000,
  MIN_HEIGHT_ERROR: 400,
  IMAGE_QUALITY: 95,
  SPRING_ANIMATION: {
    stiffness: 400,
    damping: 25,
  },
  HOVER_SCALE: 1.05,
  TAP_SCALE: 0.95,
  FOCUS_SCALE: 1.05,
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

// Dimensions
export const DIMENSIONS = {
  ICON: {
    XS: 'h-4 w-4',
    SM: 'h-5 w-5',
    MD: 'h-6 w-6',
    LG: 'h-8 w-8',
    XL: 'h-10 w-10',
    XXL: 'h-12 w-12',
  },
  BUTTON: {
    SM: 'h-8 px-3 py-1',
    MD: 'h-10 px-4 py-2',
    LG: 'h-12 px-6 py-3',
    XL: 'h-16 px-8 py-4',
  },
  LOGO: {
    WIDTH: 48,
    HEIGHT: 48,
  },
  HEADER: {
    HEIGHT: 'h-20',
  },
  MAX_WIDTH: {
    SM: 'max-w-2xl',
    MD: 'max-w-4xl',
    LG: 'max-w-6xl',
    XL: 'max-w-7xl',
  },
} as const

// Colors
export const COLORS = {
  BRAND: {
    PRIMARY: '#1E90FF',
    SECONDARY: '#6366f1',
    ACCENT: '#8b5cf6',
  },
  THEME: {
    LIGHT: {
      BG: 'from-gray-50 to-gray-100',
      TEXT: 'text-gray-900',
    },
    DARK: {
      BG: 'from-gray-950 to-gray-900',
      TEXT: 'text-gray-50',
    },
  },
  GRADIENT: {
    HERO: 'from-gray-900 to-gray-700 dark:from-gray-50 dark:to-gray-300',
    BUTTON_PRIMARY: 'from-primary-600 to-purple-600',
    BUTTON_DESTRUCTIVE: 'from-red-600 to-red-700',
    BUTTON_SUCCESS: 'from-emerald-600 to-emerald-700',
    PREMIUM: 'from-yellow-400 via-orange-500 to-red-500',
  },
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
