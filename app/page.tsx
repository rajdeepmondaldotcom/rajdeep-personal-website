import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

/**
 * The main entry point for the homepage.
 *
 * This server component fetches and sorts all blog posts, then passes them
 * to the `Main` client component to be rendered.
 *
 * @returns {Promise<JSX.Element>} A promise that resolves to the rendered homepage component.
 */
export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
