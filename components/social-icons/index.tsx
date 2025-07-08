import { Mail, Github, Youtube, Linkedin, Twitter, X, Mastodon, Instagram, Medium } from './icons'

const components = {
  mail: Mail,
  github: Github,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  x: X,
  mastodon: Mastodon,
  instagram: Instagram,
  medium: Medium,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

/**
 * A component that renders a social media icon with a link.
 *
 * It dynamically selects the appropriate SVG icon from the `components` map
 * based on the `kind` prop. The component will not render if the `href` is
 * missing or invalid (for mail links).
 *
 * @param {SocialIconProps} props - The properties for the component.
 * @param {keyof typeof components} props.kind - The type of social icon to render.
 * @param {string | undefined} props.href - The URL the icon should link to.
 * @param {number} [props.size=8] - The size of the icon, used for Tailwind CSS height and width classes (e.g., `h-8 w-8`).
 * @returns {JSX.Element | null} The rendered social icon link, or null if href is invalid.
 */
const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (
    !href ||
    (kind === 'mail' && !/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`hover:text-primary-500 dark:hover:text-primary-400 fill-current text-gray-700 dark:text-gray-200 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
