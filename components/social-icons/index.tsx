import { GrGithub, GrLinkedin, GrTwitter, GrMail } from 'react-icons/gr'
import { IconType } from 'react-icons'

const components: Record<string, IconType> = {
  mail: GrMail,
  github: GrGithub,
  linkedin: GrLinkedin,
  twitter: GrTwitter,
  x: GrTwitter,
}

const socialIconLabels: Record<string, string> = {
  mail: 'Email',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  x: 'X (formerly Twitter)',
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

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
      aria-label={`My ${socialIconLabels[kind]} profile`}
    >
      <span className="sr-only">{`My ${socialIconLabels[kind]} profile`}</span>
      <SocialSvg
        className={`hover:text-primary-500 dark:hover:text-primary-400 h-6 w-6 text-gray-700 dark:text-gray-200`}
      />
    </a>
  )
}

export default SocialIcon
