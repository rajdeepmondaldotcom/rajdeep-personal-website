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
  let headerClass =
    'flex items-center justify-between w-full bg-white dark:bg-gray-950 px-4 py-6 sm:px-6 sm:py-8'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Image
              src="/static/images/logo.png"
              alt={`${siteMetadata.title} logo`}
              width={40}
              height={40}
              className="rounded-lg shadow-sm transition-shadow duration-200 hover:shadow-md sm:h-12 sm:w-12"
            />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden text-xl font-bold tracking-tight text-gray-900 sm:block sm:text-2xl lg:text-3xl dark:text-gray-100">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 font-medium whitespace-nowrap text-gray-900 transition-colors duration-200 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <div className="flex items-center space-x-3">
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
