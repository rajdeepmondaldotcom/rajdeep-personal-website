import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/**
 * A container component for creating consistent, centered content sections.
 *
 * It wraps its children in a `<section>` element with predefined horizontal
 * padding and a maximum width, ensuring content is centered and constrained
 * within the layout.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The content to be rendered within the section.
 * @returns {JSX.Element} The rendered section container.
 */
export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">{children}</section>
  )
}
