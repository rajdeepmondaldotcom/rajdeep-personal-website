const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * Build Content Security Policy string from directives
 */
const buildCSP = () => {
  const CSP_DIRECTIVES = {
    DEFAULT_SRC: ["'self'"],
    SCRIPT_SRC: ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'giscus.app', 'analytics.umami.is'],
    STYLE_SRC: ["'self'", "'unsafe-inline'"],
    IMG_SRC: ['*', 'blob:', 'data:'],
    MEDIA_SRC: ['*.s3.amazonaws.com'],
    CONNECT_SRC: ['*'],
    FONT_SRC: ["'self'"],
    FRAME_SRC: ['giscus.app'],
  }

  const directives = Object.entries(CSP_DIRECTIVES)
    .map(([key, values]) => {
      const directive = key.replace(/_/g, '-').toLowerCase()
      return `${directive} ${values.join(' ')}`
    })
    .join('; ')

  return directives
}

/**
 * Security headers configuration
 */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: buildCSP().replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

// Build configuration
const output = process.env.EXPORT ? 'export' : process.env.DOCKER ? 'standalone' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

/**
 * Next.js configuration
 */
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]

  return plugins.reduce((acc, next) => next(acc), {
    output,
    basePath,
    reactStrictMode: true,
    trailingSlash: false,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['app', 'components', 'layouts', 'scripts'],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
      ],
      unoptimized,
      formats: ['image/avif', 'image/webp'],
    },
    experimental: {
      // Optimize package imports
      optimizePackageImports: [
        'lucide-react',
        'framer-motion',
        '@radix-ui/react-slot',
        'clsx',
        'tailwind-merge',
      ],
    },
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
    async rewrites() {
      return []
    },
    async redirects() {
      return []
    },
    webpack: (config, { isServer }) => {
      // SVG handling
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      // Optimize for client-side bundle
      if (!isServer) {
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1]
                return `lib-${packageName?.replace('@', '')}`
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
          },
        }
      }

      return config
    },
  })
}
