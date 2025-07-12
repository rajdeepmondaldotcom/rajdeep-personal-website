import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { inter, spaceGrotesk, firaCode } from './fonts'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { generateBaseMetadata } from '@/lib/seo'

export const metadata: Metadata = generateBaseMetadata()

/**
 * The root layout for the entire application.
 *
 * This component wraps every page, setting up the `<html>` and `<body>` tags,
 * loading fonts, providing theme and search contexts, and including the main
 * header, footer, and analytics. It also defines the site's primary metadata.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered
 *   within the layout, typically the current page.
 * @returns {JSX.Element} The rendered root layout.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${spaceGrotesk.variable} ${inter.variable} ${firaCode.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#0096FF"
      />
      <meta name="msapplication-TileColor" content="#0096FF" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#0096FF" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0096FF" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 antialiased dark:from-gray-950 dark:to-gray-900 dark:text-gray-50">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SpeedInsights />
          <ErrorBoundary>
            <SectionContainer>
              <div className="flex min-h-screen flex-col justify-between font-sans">
                <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                  <Header />
                  <main className="mb-auto flex-grow">{children}</main>
                </SearchProvider>
                <Footer />
              </div>
            </SectionContainer>
          </ErrorBoundary>
        </ThemeProviders>
      </body>
    </html>
  )
}
