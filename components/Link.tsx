/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

/**
 * A custom link component that intelligently handles internal, external, and
 * anchor links.
 *
 * - For internal links (starting with '/'), it uses `next/link` for optimized
 *   client-side navigation.
 * - For anchor links (starting with '#'), it uses a standard `<a>` tag for
 *   in-page navigation.
 * - For all other links, it uses a standard `<a>` tag with `target="_blank"`
 *   and `rel="noopener noreferrer"` for security and to open in a new tab.
 *
 * @param {object} props - The properties for the component, combining Next.js
 *   LinkProps and standard anchor attributes.
 * @param {string} props.href - The URL for the link.
 * @returns {JSX.Element} The rendered link component.
 */
const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return <Link className="break-words" href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />
  }

  return (
    <a className="break-words" target="_blank" rel="noopener noreferrer" href={href} {...rest} />
  )
}

export default CustomLink
