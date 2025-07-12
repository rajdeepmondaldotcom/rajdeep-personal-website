import { mergeClassNames } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

/**
 * Skeleton Component
 * A loading placeholder that mimics the shape of content
 */
export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={mergeClassNames(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        className
      )}
      {...props}
    />
  )
}

/**
 * Skeleton Text Component
 * A skeleton specifically for text content
 */
export const SkeletonText = ({ lines = 1, className }: { lines?: number; className?: string }) => {
  return (
    <div className={mergeClassNames('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={mergeClassNames('h-4', index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  )
}

/**
 * Skeleton Card Component
 * A skeleton for card layouts
 */
export const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div className={mergeClassNames('space-y-4', className)}>
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <SkeletonText lines={2} />
      </div>
    </div>
  )
}
