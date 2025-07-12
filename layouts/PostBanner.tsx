'use client'

import { ReactNode, useRef } from 'react'
import Image from '@/components/Image'
import Bleed from 'pliny/ui/Bleed'
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
 * A layout for a blog post that features a prominent banner image.
 *
 * It displays a full-width banner image at the top, followed by the post title
 * and content. It also includes the comments section and navigation links to
 * the previous and next posts.
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
export default function PostMinimal({ content, nextPost, previousPost, children }: LayoutProps) {
  const { slug, title, images, readingTime } = content
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'
  const contentRef = useRef(null)

  return (
    <SectionContainer>
      <HybridReadingProgress
        target={contentRef}
        wordCount={(readingTime as { words: number }).words}
      />
      <article ref={contentRef}>
        <div>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              <Bleed>
                <div className="relative aspect-2/1 w-full">
                  <Image src={displayImage} alt={title} fill className="object-cover" />
                </div>
              </Bleed>
            </div>
            <div className="relative pt-10">
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none py-4">{children}</div>
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
      </article>
    </SectionContainer>
  )
}
