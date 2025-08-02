'use client'

import { useRef } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import HybridReadingProgress from '@/components/HybridReadingProgress'
import ReactionsBar from '@/components/ReactionsBar'
import { PostLayoutProps } from '@/lib/types'
import { DATE_FORMATS, COMMON_STYLES } from '@/lib/constants'

/**
 * Author Details Component
 */
const AuthorDetails = ({ authorDetails }: { authorDetails: CoreContent<Authors>[] }) => (
  <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
    <dt className="sr-only">Authors</dt>
    <dd>
      <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
        {authorDetails.map((author) => (
          <li className="flex items-center space-x-2" key={author.name}>
            {author.avatar && (
              <Image
                src={author.avatar}
                width={38}
                height={38}
                alt="avatar"
                className="h-10 w-10 rounded-full"
              />
            )}
            <dl className="text-sm leading-5 font-medium whitespace-nowrap">
              <dt className="sr-only">Name</dt>
              <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
              {author.linkedin && (
                <>
                  <dt className="sr-only">LinkedIn</dt>
                  <dd>
                    <Link href={author.linkedin} className={COMMON_STYLES.TEXT.PRIMARY}>
                      @{author.linkedin.split('/').filter(Boolean).pop() || 'rajdeep-mondal'}
                    </Link>
                  </dd>
                </>
              )}
            </dl>
          </li>
        ))}
      </ul>
    </dd>
  </dl>
)

/**
 * Post Navigation Component
 */
const PostNavigation = ({
  previousPost,
  nextPost,
}: {
  previousPost?: { path: string; title: string }
  nextPost?: { path: string; title: string }
}) => {
  if (!previousPost && !nextPost) return null

  return (
    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
      {previousPost && previousPost.path && (
        <div>
          <h2 className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Previous Article
          </h2>
          <div className={COMMON_STYLES.TEXT.PRIMARY}>
            <Link href={`/${previousPost.path}`}>{previousPost.title}</Link>
          </div>
        </div>
      )}
      {nextPost && nextPost.path && (
        <div>
          <h2 className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Next Article
          </h2>
          <div className={COMMON_STYLES.TEXT.PRIMARY}>
            <Link href={`/${nextPost.path}`}>{nextPost.title}</Link>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Tags Section Component
 */
const TagsSection = ({ tags }: { tags: string[] }) => (
  <div className="py-4 xl:py-8">
    <h2 className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
      Tags
    </h2>
    <div className="flex flex-wrap">
      {tags.map((tag) => (
        <Tag key={tag} text={tag} />
      ))}
    </div>
  </div>
)

/**
 * Post Layout Component
 * Main layout for blog posts with author sidebar
 */
export default function PostLayout({
  content,
  authorDetails,
  nextPost,
  previousPost,
  children,
}: PostLayoutProps) {
  const { path, slug, date, title, tags, readingTime } = content
  const basePath = path.split('/')[0]
  const contentRef = useRef<HTMLDivElement>(null)
  const wordCount = (readingTime as { words: number }).words

  return (
    <SectionContainer>
      <HybridReadingProgress target={contentRef} wordCount={wordCount} />
      <article ref={contentRef}>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className={`text-base leading-6 font-medium ${COMMON_STYLES.TEXT.MUTED}`}>
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        siteMetadata.locale,
                        DATE_FORMATS.POST_DATE
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>

          <div className="grid-rows-[auto_1fr] pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6">
            <AuthorDetails authorDetails={authorDetails} />

            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className={`${COMMON_STYLES.PROSE} pt-6 pb-4`}>{children}</div>

              {/* Reactions Bar */}
              <div className="border-t border-gray-200/60 pt-8 dark:border-gray-700/60">
                <ReactionsBar slug={slug} />
              </div>

              {siteMetadata.comments && (
                <div
                  className="pt-8 pb-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>

            <footer>
              <div className="space-y-6 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2">
                {tags && (
                  <div className="border-t border-gray-200/60 pt-6 dark:border-gray-700/60">
                    <TagsSection tags={tags} />
                  </div>
                )}
                <div
                  className={tags ? '' : 'border-t border-gray-200/60 pt-6 dark:border-gray-700/60'}
                >
                  <PostNavigation previousPost={previousPost} nextPost={nextPost} />
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200/60 pt-6 dark:border-gray-700/60">
                <Link
                  href={`/${basePath}`}
                  className={`${COMMON_STYLES.TEXT.PRIMARY} hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center gap-2 font-medium transition-colors`}
                  aria-label="Navigate back to the main blog page"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
