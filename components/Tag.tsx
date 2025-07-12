import Link from 'next/link'
import { slug } from 'github-slugger'

interface TagProps {
  text: string
}

/**
 * A component that renders a single tag as a clickable link.
 *
 * It takes a tag string, slugifies it for the URL, and displays it.
 * The link points to the corresponding tag page.
 *
 * @param {TagProps} props - The properties for the component.
 * @param {string} props.text - The text of the tag to display.
 * @returns {JSX.Element} The rendered tag link.
 */
const Tag = ({ text }: TagProps) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="bg-primary-50 text-primary-700 hover:bg-primary-100 hover:text-primary-800 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-300 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:shadow-md"
    >
      <span className="text-xs">#</span>
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
