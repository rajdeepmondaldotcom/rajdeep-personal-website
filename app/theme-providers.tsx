'use client'

import { ThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'

/**
 * A client-side component that provides theme functionality to its children.
 *
 * This component wraps its children with the `ThemeProvider` from `next-themes`,
 * enabling light and dark mode toggling across the application. It configures the
 * provider with a default theme from the site metadata.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element} The rendered `ThemeProvider` with its children.
 */
export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
