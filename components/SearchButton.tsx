import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { KBarButton } from 'pliny/search/KBarButton'
import siteMetadata from '@/data/siteMetadata'
import { Search } from 'lucide-react'

/**
 * A component that renders a search button based on the configured search provider.
 *
 * It checks the `siteMetadata` to determine whether to render a button for
 * Algolia or KBar. If no search provider is configured, it renders nothing.
 *
 * @returns {JSX.Element | null} The rendered search button component or null.
 */
const SearchButton = () => {
  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton

    return (
      <SearchButtonWrapper aria-label="Search">
        <Search className="hover:text-primary-500 dark:hover:text-primary-400 h-6 w-6 text-gray-900 dark:text-gray-100" />
      </SearchButtonWrapper>
    )
  }
}

export default SearchButton
