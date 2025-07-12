'use client'

import React, { Component, ReactNode } from 'react'
import { ErrorInfo } from '@/lib/types'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      errorInfo: {
        message: error.message,
        stack: errorInfo.componentStack || undefined,
      },
    })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.state.errorInfo!)
      }

      // Default fallback UI
      return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-red-600 dark:text-red-400">
              Oops! Something went wrong
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="mb-8 rounded-lg bg-gray-100 p-4 text-left dark:bg-gray-800">
                <summary className="cursor-pointer font-semibold">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-4 overflow-auto text-sm">{this.state.error.stack}</pre>
              </details>
            )}

            <button
              onClick={() => window.location.reload()}
              className="bg-primary-600 hover:bg-primary-700 rounded-md px-6 py-3 text-white"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Error Fallback Component
 * A reusable error display component
 */
export const ErrorFallback = ({ error, resetError }: { error: Error; resetError?: () => void }) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Something went wrong
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {error.message || 'An unexpected error occurred'}
        </p>
        {resetError && (
          <button
            onClick={resetError}
            className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-white"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
