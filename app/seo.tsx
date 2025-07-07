import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/**
 * Generates metadata for a single page.
 *
 * This helper function creates a standard metadata object for a page,
 * including title, description, and Open Graph/Twitter card information.
 * It uses default values from `siteMetadata` if specific ones are not provided.
 *
 * @param {PageSEOProps} props - The properties for the page metadata.
 * @param {string} props.title - The title of the page.
 * @param {string} [props.description] - Optional. The description of the page.
 * @param {string} [props.image] - Optional. The URL of the image for social media cards.
 * @param {object} [props.rest] - Additional metadata properties to be spread into the object.
 * @returns {Metadata} The generated metadata object for the page.
 */
export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  return {
    title,
    description: description || siteMetadata.description,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  }
}
