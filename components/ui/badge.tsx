import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground shadow-sm hover:shadow-md hover:scale-105',
        destructive:
          'border-transparent bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md hover:shadow-lg hover:scale-105',
        outline:
          'border-2 border-primary-600/20 text-primary-600 hover:bg-primary-50 hover:border-primary-600/40 dark:text-primary-400 dark:hover:bg-primary-950/20',
        success:
          'border-transparent bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md hover:shadow-lg hover:scale-105',
        warning:
          'border-transparent bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:shadow-lg hover:scale-105',
        info: 'border-transparent bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md hover:shadow-lg hover:scale-105',
        premium:
          'relative border-transparent bg-gradient-to-r from-yellow-400 via-rose-400 to-purple-400 text-white shadow-xl hover:shadow-2xl hover:scale-110 before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-400/20 before:via-rose-400/20 before:to-purple-400/20 before:blur-lg before:transition-all hover:before:blur-xl',
        ghost:
          'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100',
      },
      size: {
        default: 'h-6 text-xs',
        sm: 'h-5 text-[10px]',
        lg: 'h-7 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  pulse?: boolean
}

function Badge({ className, variant, size, icon, pulse, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), 'animate-fade-in', className)} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {pulse && (
        <span className="relative ml-1 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
        </span>
      )}
    </div>
  )
}

export { Badge, badgeVariants }
