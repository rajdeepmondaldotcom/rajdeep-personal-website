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
        <div className="group flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 shadow-sm transition-all duration-200 hover:bg-gray-200 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700">
          <Search className="h-5 w-5 text-gray-700 transition-transform duration-200 group-hover:scale-110 dark:text-gray-200" />
        </div>
      </SearchButtonWrapper>
    )
  }

  return null
}

export default SearchButton
