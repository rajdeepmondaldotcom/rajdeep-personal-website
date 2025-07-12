/**
 * Custom Error Classes and Error Handling Utilities
 * Provides consistent error handling across the application
 */

/**
 * Base error class for application-specific errors
 */
export class ApplicationError extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(
    message: string,
    code: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.statusCode = statusCode
    this.isOperational = isOperational

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Error thrown when a requested resource is not found
 */
export class NotFoundError extends ApplicationError {
  constructor(resource: string, identifier?: string) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`
    super(message, 'NOT_FOUND', 404)
  }
}

/**
 * Error thrown when validation fails
 */
export class ValidationError extends ApplicationError {
  public readonly validationErrors: Record<string, string[]>

  constructor(message: string, validationErrors: Record<string, string[]> = {}) {
    super(message, 'VALIDATION_ERROR', 400)
    this.validationErrors = validationErrors
  }
}

/**
 * Error thrown when authentication fails
 */
export class AuthenticationError extends ApplicationError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTHENTICATION_ERROR', 401)
  }
}

/**
 * Error thrown when authorization fails
 */
export class AuthorizationError extends ApplicationError {
  constructor(message: string = 'Access denied') {
    super(message, 'AUTHORIZATION_ERROR', 403)
  }
}

/**
 * Error thrown when external service fails
 */
export class ExternalServiceError extends ApplicationError {
  public readonly service: string

  constructor(service: string, message: string) {
    super(message, 'EXTERNAL_SERVICE_ERROR', 503)
    this.service = service
  }
}

/**
 * Error thrown when rate limit is exceeded
 */
export class RateLimitError extends ApplicationError {
  public readonly retryAfter?: number

  constructor(message: string = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 'RATE_LIMIT_ERROR', 429)
    this.retryAfter = retryAfter
  }
}

/**
 * Type guard to check if error is an ApplicationError
 */
export function isApplicationError(error: unknown): error is ApplicationError {
  return error instanceof ApplicationError
}

/**
 * Type guard to check if error is operational
 */
export function isOperationalError(error: unknown): boolean {
  if (isApplicationError(error)) {
    return error.isOperational
  }
  return false
}

/**
 * Formats error for logging
 */
export function formatErrorForLogging(error: unknown): {
  message: string
  code?: string
  stack?: string
  [key: string]: unknown
} {
  if (error instanceof Error) {
    const baseError = {
      message: error.message,
      stack: error.stack,
      name: error.name,
    }

    if (isApplicationError(error)) {
      return {
        ...baseError,
        code: error.code,
        statusCode: error.statusCode,
        isOperational: error.isOperational,
      }
    }

    return baseError
  }

  return {
    message: String(error),
    type: typeof error,
  }
}

/**
 * Formats error for client response
 */
export function formatErrorForResponse(error: unknown): {
  message: string
  code?: string
  validationErrors?: Record<string, string[]>
} {
  if (isApplicationError(error)) {
    const response: {
      message: string
      code: string
      validationErrors?: Record<string, string[]>
    } = {
      message: error.message,
      code: error.code,
    }

    if (error instanceof ValidationError) {
      response.validationErrors = error.validationErrors
    }

    return response
  }

  // Don't expose internal errors to client
  return {
    message: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
  }
}

/**
 * Error boundary utility for async functions
 */
export async function withErrorBoundary<T>(
  fn: () => Promise<T>,
  errorHandler?: (error: unknown) => void
): Promise<[T | null, Error | null]> {
  try {
    const result = await fn()
    return [result, null]
  } catch (error) {
    if (errorHandler) {
      errorHandler(error)
    }
    return [null, error instanceof Error ? error : new Error(String(error))]
  }
}

/**
 * Retries a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number
    initialDelay?: number
    maxDelay?: number
    onRetry?: (error: unknown, attempt: number) => void
  } = {}
): Promise<T> {
  const { maxRetries = 3, initialDelay = 1000, maxDelay = 16000, onRetry } = options

  let lastError: unknown

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      if (attempt === maxRetries) {
        throw error
      }

      if (onRetry) {
        onRetry(error, attempt + 1)
      }

      const delay = Math.min(initialDelay * Math.pow(2, attempt), maxDelay)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError
}
