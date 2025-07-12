import SectionContainer from './SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from './Image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

/**
 * The main header for the website.
 *
 * Renders the site logo, title, primary navigation links for desktop,
 * and icons for search, theme switching, and the mobile navigation menu.
 * The header can be made sticky based on the `siteMetadata.stickyNav` setting.
 *
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-950/80">
      <SectionContainer>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="group flex items-center space-x-4">
              <span className="flex-shrink-0 transform transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/static/images/logo.png"
                  alt={`${siteMetadata.title} logo`}
                  width={48}
                  height={48}
                  className="rounded-xl shadow-md"
                />
              </span>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <span className="hover:text-primary-600 dark:hover:text-primary-400 hidden text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-200 sm:block lg:text-3xl dark:text-gray-100">
                  {siteMetadata.headerTitle}
                </span>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {headerNavLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="group hover:text-primary-600 dark:hover:text-primary-400 relative text-base font-medium text-gray-700 transition-colors duration-200 dark:text-gray-200"
                    >
                      {link.title}
                      <span className="bg-primary-600 dark:bg-primary-400 absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </SectionContainer>
    </header>
  )
}

export default Header
