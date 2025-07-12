import { formatDate } from 'pliny/utils/formatDate'
import { DATE_FORMATS } from '@/lib/constants'
import siteMetadata from '@/data/siteMetadata'

/**
 * Formatting utility functions
 */

/**
 * Format a date for display
 */
export const formatDisplayDate = (
  date: string | Date,
  locale: string = siteMetadata.locale
): string => {
  const dateString = date instanceof Date ? date.toISOString() : date
  return formatDate(dateString, locale)
}

/**
 * Format a date with full details
 */
export const formatFullDate = (
  date: string | Date,
  locale: string = siteMetadata.locale
): string => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString(locale, DATE_FORMATS.POST_DATE)
}

/**
 * Format a relative date (e.g., "2 days ago")
 */
export const formatRelativeDate = (date: string | Date): string => {
  const dateObj = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ]

  for (const [seconds, unit] of intervals) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`
    }
  }

  return 'just now'
}

/**
 * Format reading time
 */
export const formatReadingTime = (minutes: number): string => {
  if (minutes < 1) {
    return 'Less than 1 min read'
  }

  const roundedMinutes = Math.ceil(minutes)
  return `${roundedMinutes} min read`
}

/**
 * Format number with separators
 */
export const formatNumber = (num: number, locale: string = siteMetadata.locale): string => {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`
}

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number, ellipsis: string = '...'): string => {
  if (text.length <= maxLength) {
    return text
  }

  return text.slice(0, maxLength - ellipsis.length) + ellipsis
}

/**
 * Convert string to title case
 */
export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Remove HTML tags from text
 */
const stripHtmlTags = (text: string): string => {
  return text.replace(/<[^>]*>/g, '')
}

/**
 * Find the last sentence ending within the given text
 */
const findLastSentenceEnd = (text: string): number => {
  const sentenceEndings = ['.', '!', '?']
  const positions = sentenceEndings.map((ending) => text.lastIndexOf(ending))
  return Math.max(...positions)
}

/**
 * Check if position is at a reasonable point for excerpt
 */
const isReasonableExcerptPoint = (position: number, maxLength: number): boolean => {
  const REASONABLE_THRESHOLD = 0.7
  return position > maxLength * REASONABLE_THRESHOLD
}

/**
 * Create excerpt from text
 */
export const createExcerpt = (text: string, maxLength: number = 160): string => {
  const cleanText = stripHtmlTags(text)
  const truncated = cleanText.slice(0, maxLength)
  const lastSentenceEnd = findLastSentenceEnd(truncated)

  if (isReasonableExcerptPoint(lastSentenceEnd, maxLength)) {
    return cleanText.slice(0, lastSentenceEnd + 1)
  }

  return truncateText(cleanText, maxLength)
}

/**
 * Format ISO date string
 */
export const formatISODate = (date: string | Date): string => {
  return new Date(date).toISOString()
}

/**
 * Format URL slug
 */
export const formatSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
