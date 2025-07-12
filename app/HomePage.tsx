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
const HeroSection = ({ author }: { author: Authors }) => {
  if (!author || !author.body) {
    return (
      <div className="animate-fade-in space-y-8 pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
        <h1 className={`${COMMON_STYLES.HEADING.H1} mb-6`}>Hi, I'm Rajdeep Mondal</h1>
        <div className={`${COMMON_STYLES.PROSE} text-xl leading-relaxed`}>
          <p>Welcome to my personal website!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-8 pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
      <h1 className={`${COMMON_STYLES.HEADING.H1} mb-6`}>Hi, I'm Rajdeep Mondal</h1>
      <div className={`${COMMON_STYLES.PROSE} max-w-3xl text-xl leading-relaxed`}>
        <MDXLayoutRenderer code={author.body.code} />
      </div>
    </div>
  )
}

/**
 * Blog Post Item Component
 */
const BlogPostItem = ({ post }: { post: CoreContent<Blog> }) => {
  const { slug, date, title, summary, tags } = post

  return (
    <li className="animate-slide-up py-8">
      <article className="group relative">
        <div className="from-primary-500/5 absolute -inset-4 rounded-2xl bg-gradient-to-r to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative">
          <div className={`${COMMON_STYLES.LAYOUT.CARD_SPACING} xl:grid xl:grid-cols-4 xl:gap-8`}>
            <dl className="xl:col-span-1">
              <dt className="sr-only">Published on</dt>
              <dd className={`text-base font-medium ${COMMON_STYLES.TEXT.MUTED}`}>
                <time dateTime={date}>{formatDisplayDate(date)}</time>
              </dd>
            </dl>
            <div className="space-y-6 xl:col-span-3">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-3 text-2xl font-bold tracking-tight">
                    <Link
                      href={`${ROUTES.BLOG}/${slug}`}
                      className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-900 transition-colors duration-200 dark:text-gray-100"
                    >
                      {title}
                    </Link>
                  </h3>
                  {tags && tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  )}
                </div>
                {summary && (
                  <div
                    className={`prose max-w-none text-lg leading-relaxed text-gray-600 dark:text-gray-300`}
                  >
                    {summary}
                  </div>
                )}
              </div>
              <div className="text-base font-semibold">
                <Link
                  href={`${ROUTES.BLOG}/${slug}`}
                  className={`${COMMON_STYLES.TEXT.PRIMARY} group inline-flex items-center gap-2`}
                  aria-label={`Read more: "${title}"`}
                >
                  Read more
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
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
  const safePosts = posts || []
  const displayPosts = safePosts.slice(0, PAGINATION.POSTS_PER_PAGE)
  const hasMorePosts = safePosts.length > PAGINATION.POSTS_PER_PAGE

  return (
    <>
      <div className="pt-12 pb-8" id="latest-posts">
        <h2 className={`mb-12 ${COMMON_STYLES.HEADING.H2}`}>Latest Blog Posts</h2>
        <ul className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
          {displayPosts.length === 0 ? (
            <EmptyState
              title="No blog posts yet"
              description="Check back soon for updates!"
              className="py-16"
            />
          ) : (
            displayPosts.map((post, index) => (
              <div key={post.slug} style={{ animationDelay: `${index * 100}ms` }}>
                <BlogPostItem post={post} />
              </div>
            ))
          )}
        </ul>
      </div>

      {hasMorePosts && (
        <div className="mt-8 flex justify-end text-lg font-semibold">
          <Link
            href={ROUTES.BLOG}
            className={`${COMMON_STYLES.TEXT.PRIMARY} group inline-flex items-center gap-2`}
            aria-label="All posts"
          >
            View all posts
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
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
      <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
        <HeroSection author={author} />
        <LatestBlogPosts posts={posts} />
      </div>

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-16 pb-8">
          <div className="card-premium animate-fade-in w-full max-w-md p-8">
            <NewsletterForm />
          </div>
        </div>
      )}
    </>
  )
}
