import { mergeClassNames } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Loading Spinner Component
 * A simple animated spinner for loading states
 */
export const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div
      className={mergeClassNames(
        'border-t-primary-600 dark:border-t-primary-400 animate-spin rounded-full border-2 border-gray-300 dark:border-gray-600',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

/**
 * Full Page Loading Component
 * Centers a loading spinner in the viewport
 */
export const FullPageLoading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )
}

/**
 * Loading Overlay Component
 * Shows a loading spinner over content
 */
export const LoadingOverlay = ({
  show = true,
  children,
}: {
  show?: boolean
  children?: React.ReactNode
}) => {
  if (!show) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        {children && <div className="text-sm text-gray-600 dark:text-gray-400">{children}</div>}
      </div>
    </div>
  )
}

/**
 * Loading Text Component
 * Animated dots for inline loading text
 */
export const LoadingText = ({ text = 'Loading' }: { text?: string }) => {
  return (
    <span className="inline-flex items-center">
      {text}
      <span className="ml-1 inline-flex">
        <span className="animation-delay-0 animate-bounce">.</span>
        <span className="animation-delay-150 animate-bounce">.</span>
        <span className="animation-delay-300 animate-bounce">.</span>
      </span>
    </span>
  )
}
