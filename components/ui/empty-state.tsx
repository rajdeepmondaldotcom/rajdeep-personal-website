import { mergeClassNames } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

/**
 * Empty State Component
 * Shows when there's no data to display
 */
export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => {
  return (
    <div
      className={mergeClassNames(
        'flex flex-col items-center justify-center px-4 py-16 text-center',
        className
      )}
    >
      {icon && <div className="mb-4 text-gray-400 dark:text-gray-600">{icon}</div>}

      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>

      {description && (
        <p className="mb-6 max-w-md text-sm text-gray-600 dark:text-gray-400">{description}</p>
      )}

      {action && (
        <button
          onClick={action.onClick}
          className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-sm text-white"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

/**
 * No Results Component
 * Specific empty state for search/filter results
 */
export const NoResults = ({
  searchTerm,
  onClear,
}: {
  searchTerm?: string
  onClear?: () => void
}) => {
  return (
    <EmptyState
      icon={
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
      title={searchTerm ? `No results found for "${searchTerm}"` : 'No results found'}
      description="Try adjusting your search or filters to find what you're looking for."
      action={
        onClear
          ? {
              label: 'Clear search',
              onClick: onClear,
            }
          : undefined
      }
    />
  )
}
