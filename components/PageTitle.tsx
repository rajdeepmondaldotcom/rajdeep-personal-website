import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/**
 * A component for rendering a consistent, styled page title.
 *
 * It applies standard heading styles for page titles across the site,
 * ensuring a uniform look and feel.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The content to be displayed as the page title.
 * @returns {JSX.Element} The rendered h1 element with styling.
 */
export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
      {children}
    </h1>
  )
}
