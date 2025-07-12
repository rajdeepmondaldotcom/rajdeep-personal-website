/* eslint-disable jsx-a11y/heading-has-content */
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import { cn } from '@/lib/utils'

const MDXComponents: MDXComponentsType = {
  Image,
  BlogNewsletterForm,
  a: CustomLink,
  pre: Pre,
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-sm',
        "before:content-[''] after:content-['']",
        'text-gray-900 dark:bg-gray-800 dark:text-gray-100',
        'border border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    />
  ),
  table: TableWrapper,
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'relative pl-6 text-gray-700 italic dark:text-gray-300',
        'border-primary-500 border-l-4',
        "before:absolute before:top-0 before:left-0 before:text-6xl before:text-gray-200 before:content-['\"'] before:dark:text-gray-700",
        'my-6 space-y-2',
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-8 border-t border-gray-200 dark:border-gray-700" {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn('marker:text-primary-600 my-6 ml-6 list-disc space-y-2', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn('marker:text-primary-600 my-6 ml-6 list-decimal space-y-2', className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('ml-1 pl-1 text-gray-700 dark:text-gray-300', className)} {...props} />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className={cn('font-semibold text-gray-900 dark:text-gray-100', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('my-6 leading-relaxed text-gray-700 dark:text-gray-300', className)}
      {...props}
    />
  ),
  // Headings with gradient hover effect
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'group relative my-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
        'hover:from-primary-600 hover:bg-gradient-to-r hover:to-purple-600 hover:bg-clip-text hover:text-transparent',
        'transition-all duration-300',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'group relative my-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
        'hover:from-primary-600 hover:bg-gradient-to-r hover:to-purple-600 hover:bg-clip-text hover:text-transparent',
        'transition-all duration-300',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'group relative my-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
        'hover:from-primary-600 hover:bg-gradient-to-r hover:to-purple-600 hover:bg-clip-text hover:text-transparent',
        'transition-all duration-300',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'group relative my-4 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        'group relative my-4 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        'group relative my-4 text-base font-bold tracking-tight text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    />
  ),
  // Enhanced table elements
  thead: ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn('bg-gray-50 dark:bg-gray-800', className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'px-6 py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300',
        className
      )}
      {...props}
    />
  ),
  // Enhanced kbd element
  kbd: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <kbd
      className={cn(
        'inline-flex items-center justify-center px-2 py-1 text-xs font-semibold',
        'rounded-md border border-gray-300 bg-gray-100 text-gray-800 shadow-sm',
        'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100',
        className
      )}
      {...props}
    />
  ),
}

export const components = MDXComponents
export default MDXComponents
