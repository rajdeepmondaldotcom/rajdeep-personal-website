'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

/**
 * A component that handles the rendering and lazy-loading of the comment section.
 *
 * It displays a "Load Comments" button. When clicked, it dynamically loads and
 * renders the comment system (e.g., Giscus, Disqus) provided by the `pliny`
 * library, based on the site's configuration.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.slug - The unique identifier for the content (e.g., blog post slug)
 *   to associate the comments with.
 * @returns {JSX.Element | null} The rendered comments component or null if no
 *   comment provider is configured.
 */
export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)

  if (!siteMetadata.comments?.provider) {
    return null
  }
  return (
    <>
      {loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
    </>
  )
}
