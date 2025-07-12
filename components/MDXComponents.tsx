import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import AdaptiveLink from './Link'
import TableWrapper from './TableWrapper'

/**
 * A set of custom components to be used for rendering MDX content.
 *
 * This object maps standard HTML tags (like `a`, `pre`, `table`) and custom
 * components (like `Image`, `TOCInline`) to their React component implementations.
 * This allows for consistent and enhanced styling of content rendered from
 * Markdown or MDX files throughout the site.
 *
 * @type {MDXComponents}
 */
export const components: MDXComponents = {
  Image,
  TOCInline,
  a: AdaptiveLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
}
