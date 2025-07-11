import { Inter } from 'next/font/google'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'

interface Props {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

/**
 * A primary layout component that wraps the main content of every page.
 *
 * It establishes the overall page structure, including the site header and
 * footer, and sets the primary font for the site using `next/font`. It ensures
 * a consistent layout across all pages.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child elements to be rendered
 *   within the main content area of the layout.
 * @returns {JSX.Element} The rendered page layout with header, content, and footer.
 */
const LayoutWrapper = ({ children }: Props) => {
  return (
    <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
      <Header />
      <main className="mb-auto">
        <SectionContainer>{children}</SectionContainer>
      </main>
      <Footer />
    </div>
  )
}

export default LayoutWrapper
