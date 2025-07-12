import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { generatePageMetadata } from 'app/seo'

export const metadata = generatePageMetadata({ title: 'About' })

/**
 * The page component for the "About" section.
 *
 * It fetches the default author's data and renders it using the `AuthorLayout`,
 * which displays the author's profile information and biography.
 *
 * @returns {JSX.Element} The rendered About page.
 */
export default function Page() {
  const author = allAuthors.find((author) => author.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
