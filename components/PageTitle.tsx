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
    <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
      {children}
    </h1>
  )
}
