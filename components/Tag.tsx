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
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
