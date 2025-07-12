import HomePage from './HomePage'
import { getAllPosts, getDefaultAuthor } from '@/lib/services'
import { NotFoundError } from '@/lib/errors'

/**
 * Homepage Route Handler
 * Server component that fetches data and renders the homepage
 */
export default async function Page() {
  const posts = getAllPosts()

  let author
  try {
    author = getDefaultAuthor()
  } catch (_error) {
    throw new NotFoundError('Default author')
  }

  return <HomePage posts={posts} author={author} />
}
