'use client'

import { ReactNode, useRef } from 'react'
// import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import HybridReadingProgress from '@/components/HybridReadingProgress'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  nextPost?: { path: string; title: string }
  previousPost?: { path: string; title: string }
}

/**
 * A simple layout for rendering a blog post without author details in the sidebar.
 *
 * It displays the post's title and publication date, followed by the main
 * content, a comments section, and navigation to the next/previous posts.
 *
 * @param {LayoutProps} props - The properties for the component.
 * @param {CoreContent<Blog>} props.content - The core content of the blog post.
 * @param {React.ReactNode} props.children - The main content of the post (the body).
 * @param {object} [props.nextPost] - Optional. The next post in the series.
 * @param {string} props.nextPost.path - The path to the next post.
 * @param {string} props.nextPost.title - The title of the next post.
 * @param {object} [props.previousPost] - Optional. The previous post in the series.
 * @param {string} props.previousPost.path - The path to the previous post.
 * @param {string} props.previousPost.title - The title of the previous post.
 * @returns {JSX.Element} The rendered post layout.
 */
export default function PostLayout({ content, nextPost, previousPost, children }: LayoutProps) {
  const { slug, date, title, readingTime } = content
  const contentRef = useRef(null)

  return (
    <SectionContainer>
      <HybridReadingProgress
        target={contentRef}
        wordCount={(readingTime as { words: number }).words}
      />
      <article ref={contentRef}>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] pb-8">
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose dark:prose-invert max-w-none pt-6 pb-4">{children}</div>
            </div>
            {siteMetadata.comments && (
              <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )}
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {previousPost && previousPost.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${previousPost.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Previous post: ${previousPost.title}`}
                    >
                      &larr; {previousPost.title}
                    </Link>
                  </div>
                )}
                {nextPost && nextPost.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${nextPost.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Next post: ${nextPost.title}`}
                    >
                      {nextPost.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
