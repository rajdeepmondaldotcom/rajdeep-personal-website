import siteMetadata from '@/data/siteMetadata'
import SocialLink from '@/components/social-icons'

/**
 * The primary footer component for the website.
 *
 * Renders a set of social media icons, the author's name, the current year,
 * and the site title. All data is sourced from the `siteMetadata` object.
 *
 * @returns {JSX.Element} The rendered footer element.
 */
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <SocialLink kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            <SocialLink kind="github" href={siteMetadata.github} size={6} />
            <SocialLink kind="linkedin" href={siteMetadata.linkedin} size={6} />
            <SocialLink kind="x" href={siteMetadata.x} size={6} />
            {/* <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} /> */}
          </div>
          <div className="flex items-center gap-2 text-base text-gray-600 dark:text-gray-400">
            <span>{`© ${new Date().getFullYear()}`}</span>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <span className="font-medium">{siteMetadata.author}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
