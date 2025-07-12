/**
 * API Type Definitions
 * Consistent patterns for API requests and responses
 */

import { Result } from './common'

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: ApiMetadata
}

/**
 * API error structure
 */
export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: string
}

/**
 * API metadata for responses
 */
export interface ApiMetadata {
  timestamp: string
  version: string
  requestId?: string
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

/**
 * API request options
 */
export interface ApiRequestOptions {
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  signal?: AbortSignal
  timeout?: number
}

/**
 * API endpoint configuration
 */
export interface ApiEndpoint {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  authenticated?: boolean
  rateLimit?: {
    requests: number
    window: number
  }
}

/**
 * Type-safe API client interface
 */
export interface ApiClient {
  get<T>(path: string, options?: ApiRequestOptions): Promise<Result<T>>
  post<T>(path: string, data: unknown, options?: ApiRequestOptions): Promise<Result<T>>
  put<T>(path: string, data: unknown, options?: ApiRequestOptions): Promise<Result<T>>
  delete<T>(path: string, options?: ApiRequestOptions): Promise<Result<T>>
  patch<T>(path: string, data: unknown, options?: ApiRequestOptions): Promise<Result<T>>
}
