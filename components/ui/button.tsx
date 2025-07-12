import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-primary-600 to-purple-600 text-primary-foreground shadow-lg hover:from-primary-700 hover:to-purple-700 hover:shadow-xl active:scale-[0.98]',
        destructive:
          'bg-gradient-to-r from-red-600 to-red-700 text-destructive-foreground shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-xl active:scale-[0.98]',
        outline:
          'border-2 border-primary-600/20 bg-background shadow-sm hover:bg-primary-50 hover:border-primary-600/40 hover:shadow-md dark:hover:bg-primary-950/20',
        secondary:
          'bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80 hover:shadow-lg active:scale-[0.98]',
        ghost: 'hover:bg-accent/80 hover:text-accent-foreground hover:shadow-sm',
        link: 'text-primary-600 underline-offset-4 hover:underline hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300',
        premium:
          'relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-2xl hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98] before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-400/20 before:via-orange-500/20 before:to-red-500/20 before:blur-xl before:transition-all hover:before:blur-2xl',
      },
      size: {
        default: 'h-10 px-5 py-2.5',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        xl: 'h-14 rounded-2xl px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

function Button({ className, variant, size, asChild = false, ref, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
