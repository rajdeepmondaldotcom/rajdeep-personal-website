import HomePage from './HomePage'
import { getAllPosts, getDefaultAuthor } from '@/lib/services'
import { ERROR_MESSAGES } from '@/lib/constants'

/**
 * Homepage Route Handler
 * Server component that fetches data and renders the homepage
 */
export default async function Page() {
  const posts = getAllPosts()
  const authorResponse = getDefaultAuthor()

  if (authorResponse.error) {
    throw new Error(ERROR_MESSAGES.AUTHOR_NOT_FOUND)
  }

  return <HomePage posts={posts} author={authorResponse.data!} />
}
