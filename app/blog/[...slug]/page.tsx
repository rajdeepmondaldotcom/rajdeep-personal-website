import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { Blog, allBlogs } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostNavigation, getAuthorDetailsForPost } from '@/lib/services'
import { LAYOUT_TYPES, SEO } from '@/lib/constants'
import { formatISODate } from '@/lib/utils/formatting'
import { Authors } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'

const layouts = {
  [LAYOUT_TYPES.POST_SIMPLE]: PostSimple,
  [LAYOUT_TYPES.POST_LAYOUT]: PostLayout,
  [LAYOUT_TYPES.POST_BANNER]: PostBanner,
}

type LayoutType = keyof typeof layouts

/**
 * Generate metadata for blog post pages
 */
export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  let post: Blog
  try {
    post = getPostBySlug(slug)
  } catch {
    return undefined
  }
  const authorDetails = getAuthorDetailsForPost(post.authors)
  const authors = authorDetails.filter((author) => author !== null).map((author) => author.name)

  const publishedAt = formatISODate(post.date)
  const modifiedAt = formatISODate(post.lastmod || post.date)
  const imageList = (post.images as string[] | undefined)?.length
    ? (post.images as string[])
    : [siteMetadata.socialBanner]
  const ogImages = imageList.map((img) => ({
    url: img.includes('http') ? img : siteMetadata.siteUrl + img,
  }))

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: SEO.DEFAULT_LOCALE,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: SEO.TWITTER_CARD_TYPE,
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

/**
 * Generate static params for all blog posts
 */
export async function generateStaticParams() {
  const paths = allBlogs.map((post) => ({
    slug: post.slug.split('/').map((name) => decodeURI(name)),
  }))

  return paths
}

/**
 * Blog Post Page Component
 */
export default async function BlogPostPage(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  // Get post data
  let post: Blog
  try {
    post = getPostBySlug(slug)
  } catch {
    return notFound()
  }

  // Get navigation
  const { previousPost, nextPost } = getPostNavigation(slug)

  // Get author details
  const authorDetails = getAuthorDetailsForPost(post.authors)
  const validAuthorDetails = authorDetails.filter(
    (author): author is CoreContent<Authors> => author !== null
  )

  // Prepare content
  const mainContent = coreContent(post)
  const jsonLd = {
    ...(post.structuredData as Record<string, unknown>),
    author: validAuthorDetails.map((author) => ({
      '@type': 'Person',
      name: author.name,
    })),
  }

  // Select layout
  const layoutKey = (post.layout || LAYOUT_TYPES.DEFAULT) as LayoutType
  const Layout = layouts[layoutKey] || layouts[LAYOUT_TYPES.POST_LAYOUT]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout
        content={mainContent}
        authorDetails={validAuthorDetails}
        nextPost={nextPost}
        previousPost={previousPost}
      >
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc as unknown} />
      </Layout>
    </>
  )
}
