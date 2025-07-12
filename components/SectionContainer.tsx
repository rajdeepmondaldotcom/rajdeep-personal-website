import { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
}

/**
 * A container component that provides consistent horizontal padding and centering
 * for page sections.
 *
 * This component wraps its children in a div with responsive padding and max-width
 * constraints to maintain proper content alignment across different screen sizes.
 *
 * @param {SectionContainerProps} props - The component properties
 * @param {React.ReactNode} props.children - The child elements to be rendered within the container
 * @returns {JSX.Element} The rendered section container
 */
export default function SectionContainer({ children }: SectionContainerProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">{children}</section>
  )
}
