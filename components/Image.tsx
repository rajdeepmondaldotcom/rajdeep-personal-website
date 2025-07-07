import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

/**
 * A wrapper around the `next/image` component to handle the `basePath`.
 *
 * This component automatically prepends the `BASE_PATH` environment variable
 * to the image source URL, simplifying image paths when the site is hosted
 * on a subpath.
 *
 * @param {ImageProps} props - The properties for the Next.js Image component.
 * @returns {JSX.Element} The rendered Next.js Image component with a modified src.
 */
const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage src={`${basePath || ''}${src}`} {...rest} />
)

export default Image
