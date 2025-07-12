import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { PageSEOProps } from '@/lib/types'
import { SEO } from '@/lib/constants'

/**
 * Generate base metadata for the site
 */
export const generateBaseMetadata = (): Metadata => ({
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `${SEO.TITLE_TEMPLATE}${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: SEO.DEFAULT_LOCALE,
    type: SEO.OG_TYPE,
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: siteMetadata.twitter,
    creator: siteMetadata.twitter,
    card: SEO.TWITTER_CARD_TYPE,
    images: [siteMetadata.socialBanner],
  },
})

/**
 * Generate page-specific metadata
 */
export const generatePageSEO = ({ title, description, image, ...rest }: PageSEOProps): Metadata => {
  const pageTitle = title
  const pageDescription = description || siteMetadata.description
  const pageImage = image || siteMetadata.socialBanner

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: `${pageTitle} | ${siteMetadata.title}`,
      description: pageDescription,
      url: './',
      siteName: siteMetadata.title,
      images: pageImage,
      locale: SEO.DEFAULT_LOCALE,
      type: SEO.OG_TYPE,
    },
    twitter: {
      title: `${pageTitle} | ${siteMetadata.title}`,
      description: pageDescription,
      card: SEO.TWITTER_CARD_TYPE,
      images: pageImage,
    },
    ...rest,
  }
}

/**
 * Generate JSON-LD structured data for organization
 */
export const generateOrganizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteMetadata.title,
  url: siteMetadata.siteUrl,
  logo: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
  sameAs: [siteMetadata.github, siteMetadata.linkedin, siteMetadata.twitter].filter(Boolean),
})

/**
 * Generate JSON-LD structured data for website
 */
export const generateWebsiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteMetadata.title,
  description: siteMetadata.description,
  url: siteMetadata.siteUrl,
  author: {
    '@type': 'Person',
    name: siteMetadata.author,
  },
})

/**
 * Create canonical URL
 */
export const createCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${siteMetadata.siteUrl}${cleanPath}`
}
