import { ReactNode } from 'react'

interface PageTitleProps {
  children: ReactNode
}

/**
 * A component for rendering page titles with consistent styling.
 *
 * Displays the title with large, bold text and responsive sizing across
 * different screen sizes. Used as the main heading for pages and blog posts.
 *
 * @param {PageTitleProps} props - The component properties
 * @param {React.ReactNode} props.children - The title text or elements to display
 * @returns {JSX.Element} The rendered page title
 */
export default function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-5xl md:text-6xl dark:from-gray-50 dark:to-gray-300">
      {children}
    </h1>
  )
}
