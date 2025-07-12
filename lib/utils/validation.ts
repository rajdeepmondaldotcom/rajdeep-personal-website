/**
 * Validation utility functions
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate slug format
 */
export const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}

/**
 * Validate hex color
 */
export const isValidHexColor = (color: string): boolean => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return hexRegex.test(color)
}

/**
 * Validate date string
 */
export const isValidDateString = (dateStr: string): boolean => {
  const date = new Date(dateStr)
  return !isNaN(date.getTime())
}

/**
 * Validate non-empty string
 */
export const isNonEmptyString = (str: any): str is string => {
  return typeof str === 'string' && str.trim().length > 0
}

/**
 * Validate array has items
 */
export const hasItems = <T>(arr: T[] | null | undefined): arr is T[] => {
  return Array.isArray(arr) && arr.length > 0
}

/**
 * Validate object has keys
 */
export const hasKeys = (obj: any): boolean => {
  return obj && typeof obj === 'object' && Object.keys(obj).length > 0
}

/**
 * Validate number is within range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}

/**
 * Validate positive integer
 */
export const isPositiveInteger = (value: any): value is number => {
  return Number.isInteger(value) && value > 0
}

/**
 * Validate required fields in object
 */
export const validateRequiredFields = <T extends Record<string, any>>(
  obj: T,
  requiredFields: (keyof T)[]
): { isValid: boolean; missingFields: string[] } => {
  const missingFields = requiredFields.filter(
    (field) => !obj[field] || (typeof obj[field] === 'string' && !obj[field].trim())
  )

  return {
    isValid: missingFields.length === 0,
    missingFields: missingFields as string[],
  }
}

/**
 * Sanitize user input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000) // Limit length
}

/**
 * Validate file extension
 */
export const isValidFileExtension = (filename: string, allowedExtensions: string[]): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase()
  return extension ? allowedExtensions.includes(extension) : false
}

/**
 * Validate image URL
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!isValidUrl(url)) return false

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  const urlPath = new URL(url).pathname.toLowerCase()

  return imageExtensions.some((ext) => urlPath.endsWith(`.${ext}`))
}
