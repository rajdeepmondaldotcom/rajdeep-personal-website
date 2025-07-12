import { PAGINATION, VALIDATION } from '@/lib/constants'

/**
 * Pagination utility functions
 */

/**
 * Calculate total pages based on item count
 */
export const calculateTotalPages = (
  totalItems: number,
  itemsPerPage: number = PAGINATION.POSTS_PER_PAGE
): number => {
  return Math.ceil(totalItems / itemsPerPage)
}

/**
 * Get pagination range
 */
export const getPaginationRange = (
  page: number,
  itemsPerPage: number = PAGINATION.POSTS_PER_PAGE
): { start: number; end: number } => {
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage

  return { start, end }
}

/**
 * Validate page number
 */
export const isValidPageNumber = (page: number, totalPages: number): boolean => {
  return !isNaN(page) && page >= VALIDATION.MIN_PAGE_NUMBER && page <= totalPages
}

/**
 * Get paginated items from array
 */
export const paginateArray = <T>(
  items: T[],
  page: number,
  itemsPerPage: number = PAGINATION.POSTS_PER_PAGE
): T[] => {
  const { start, end } = getPaginationRange(page, itemsPerPage)
  return items.slice(start, end)
}

/**
 * Generate page numbers for pagination component
 */
export const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | string)[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | string)[] = []
  const halfVisible = Math.floor(maxVisible / 2)

  // Always show first page
  pages.push(1)

  // Calculate start and end of visible range
  let start = Math.max(2, currentPage - halfVisible)
  let end = Math.min(totalPages - 1, currentPage + halfVisible)

  // Adjust if we're near the beginning or end
  if (currentPage <= halfVisible + 1) {
    end = Math.min(totalPages - 1, maxVisible - 1)
  } else if (currentPage >= totalPages - halfVisible) {
    start = Math.max(2, totalPages - maxVisible + 2)
  }

  // Add ellipsis if needed
  if (start > 2) {
    pages.push('...')
  }

  // Add visible page numbers
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // Add ellipsis if needed
  if (end < totalPages - 1) {
    pages.push('...')
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
}

/**
 * Create pagination metadata
 */
export const createPaginationMetadata = (
  currentPage: number,
  totalItems: number,
  itemsPerPage: number = PAGINATION.POSTS_PER_PAGE
) => {
  const totalPages = calculateTotalPages(totalItems, itemsPerPage)

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    startItem: (currentPage - 1) * itemsPerPage + 1,
    endItem: Math.min(currentPage * itemsPerPage, totalItems),
  }
}
