import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { Authors, Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { HomePageProps } from '@/lib/types'
import { PAGINATION, ROUTES, COMMON_STYLES } from '@/lib/constants'
import { formatDisplayDate } from '@/lib/utils/formatting'
import { EmptyState } from '@/components/ui/empty-state'

/**
 * Hero Section Component
 */
const HeroSection = ({ author }: { author: Authors }) => (
  <div className="space-y-2 pt-6 pb-8 md:space-y-5">
    <h1 className={COMMON_STYLES.HEADING.H1}>Hi, I'm Rajdeep Mondal</h1>
    <div className={`${COMMON_STYLES.PROSE} pt-4 pb-4`}>
      <MDXLayoutRenderer code={author.body.code} />
    </div>
  </div>
)

/**
 * Blog Post Item Component
 */
const BlogPostItem = ({ post }: { post: CoreContent<Blog> }) => {
  const { slug, date, title, summary, tags } = post

  return (
    <li className="py-12">
      <article>
        <div className={COMMON_STYLES.LAYOUT.CARD_SPACING}>
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className={`text-base leading-6 font-medium ${COMMON_STYLES.TEXT.MUTED}`}>
              <time dateTime={date}>{formatDisplayDate(date)}</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h3 className={COMMON_STYLES.HEADING.H2}>
                  <Link
                    href={`${ROUTES.BLOG}/${slug}`}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </Link>
                </h3>
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                )}
              </div>
              {summary && (
                <div className={`prose max-w-none ${COMMON_STYLES.TEXT.MUTED}`}>{summary}</div>
              )}
            </div>
            <div className="text-base leading-6 font-medium">
              <Link
                href={`${ROUTES.BLOG}/${slug}`}
                className={COMMON_STYLES.TEXT.PRIMARY}
                aria-label={`Read more: "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}

/**
 * Latest Blog Posts Section
 */
const LatestBlogPosts = ({ posts }: { posts: CoreContent<Blog>[] }) => {
  const displayPosts = posts.slice(0, PAGINATION.POSTS_PER_PAGE)
  const hasMorePosts = posts.length > PAGINATION.POSTS_PER_PAGE

  return (
    <>
      <div className="pt-8">
        <h2 className={`mb-4 ${COMMON_STYLES.HEADING.H2}`}>Latest Blog Posts</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {displayPosts.length === 0 ? (
            <EmptyState
              title="No blog posts yet"
              description="Check back soon for updates!"
              className="py-8"
            />
          ) : (
            displayPosts.map((post) => <BlogPostItem key={post.slug} post={post} />)
          )}
        </ul>
      </div>

      {hasMorePosts && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link href={ROUTES.BLOG} className={COMMON_STYLES.TEXT.PRIMARY} aria-label="All posts">
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}

/**
 * Homepage Component
 */
export default function HomePage({ posts, author }: HomePageProps) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <HeroSection author={author} />
        <LatestBlogPosts posts={posts} />
      </div>

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
