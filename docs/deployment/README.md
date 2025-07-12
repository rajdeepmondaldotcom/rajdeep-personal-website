# Deployment Guide

> Complete deployment documentation for Rajdeep Personal Website

## Table of Contents

- [Overview](#overview)
- [Deployment Platforms](#deployment-platforms)
- [Vercel Deployment](#vercel-deployment)
- [Environment Variables](#environment-variables)
- [Build Process](#build-process)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Overview

The application is optimized for modern deployment platforms with:

- **Static Generation** - Pre-rendered pages for optimal performance
- **Edge Functions** - API routes running at the edge
- **Global CDN** - Automatic distribution worldwide
- **Zero Configuration** - Works out of the box with Vercel

## Deployment Platforms

### Recommended: Vercel

Vercel is the recommended platform because:

- Native Next.js support
- Automatic optimizations
- Built-in analytics
- Edge network
- Zero configuration

### Alternative Platforms

- **Netlify** - Good Next.js support
- **AWS Amplify** - Full AWS integration
- **Railway** - Simple deployment
- **Docker** - Self-hosted option

## Vercel Deployment

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frajdeepmondaldotcom%2Frajdeep-personal-website)

### Manual Deployment

#### 1. Install Vercel CLI

```bash
npm i -g vercel
```

#### 2. Deploy

```bash
# In project root
vercel

# Follow prompts:
# - Link to existing project or create new
# - Configure project settings
# - Deploy
```

#### 3. Production Deployment

```bash
# Deploy to production
vercel --prod
```

### GitHub Integration

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import Git Repository
   - Select your repository

2. **Configure Project**
   - Framework Preset: Next.js
   - Build Command: `yarn build`
   - Output Directory: `.next`
   - Install Command: `yarn install`

3. **Environment Variables**
   - Add required variables in project settings
   - See [Environment Variables](#environment-variables)

4. **Deploy**
   - Automatic deployment on push to main
   - Preview deployments for pull requests

## Environment Variables

### Required Variables

```env
# None required for basic deployment
```

### Optional Variables

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
BASE_PATH=/optional-base-path

# Analytics
NEXT_UMAMI_ID=your-umami-website-id
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX

# Newsletter (ConvertKit)
CONVERTKIT_API_KEY=your-api-key
CONVERTKIT_FORM_ID=your-form-id

# Comments (Giscus)
NEXT_PUBLIC_GISCUS_REPO=owner/repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=R_xxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx
```

### Setting Environment Variables

#### Vercel Dashboard

1. Go to Project Settings
2. Navigate to "Environment Variables"
3. Add variables for Production/Preview/Development
4. Save changes

#### Vercel CLI

```bash
# Set production variable
vercel env add NEXT_PUBLIC_SITE_URL production

# Set for all environments
vercel env add CONVERTKIT_API_KEY
```

## Build Process

### Build Pipeline

```mermaid
graph LR
    A[Source Code] --> B[Install Dependencies]
    B --> C[Run Build]
    C --> D[Generate Static Pages]
    D --> E[Optimize Assets]
    E --> F[Deploy to CDN]
```

### Build Steps

1. **Install Dependencies**

   ```bash
   yarn install
   ```

2. **Type Checking**

   ```bash
   yarn type-check
   ```

3. **Build Application**

   ```bash
   yarn build
   ```

4. **Post-Build Scripts**
   - Generate RSS feed
   - Create search index
   - Optimize images

### Build Configuration

```javascript
// next.config.js
module.exports = {
  // Output configuration
  output: process.env.DOCKER ? 'standalone' : undefined,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },

  // Build optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}
```

## Monitoring

### Vercel Analytics

Built-in analytics for:

- Page views
- Web Vitals
- User demographics
- Real User Monitoring (RUM)

Enable in `app/layout.tsx`:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Custom Monitoring

#### Umami Analytics

1. Set up Umami instance
2. Add website
3. Set environment variable:
   ```env
   NEXT_UMAMI_ID=your-website-id
   ```

#### Google Analytics

1. Create GA4 property
2. Set environment variable:
   ```env
   NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
   ```

### Performance Monitoring

Monitor key metrics:

- **First Contentful Paint (FCP)**
- **Largest Contentful Paint (LCP)**
- **Time to Interactive (TTI)**
- **Cumulative Layout Shift (CLS)**

### Error Tracking

Consider adding:

- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Datadog** - APM and logging

## Deployment Checklist

### Pre-Deployment

- [ ] Run build locally: `yarn build`
- [ ] Check TypeScript: `yarn type-check`
- [ ] Run linter: `yarn lint`
- [ ] Test all pages
- [ ] Verify environment variables
- [ ] Update dependencies
- [ ] Review security headers

### Post-Deployment

- [ ] Verify live site
- [ ] Check all routes
- [ ] Test forms and interactions
- [ ] Verify analytics
- [ ] Check performance metrics
- [ ] Monitor error logs
- [ ] Test on multiple devices

## Troubleshooting

### Build Failures

#### Module Not Found

```bash
Module not found: Can't resolve 'module-name'
```

**Solution:**

```bash
# Clear cache and reinstall
rm -rf .next node_modules
yarn install
yarn build
```

#### Type Errors

```bash
Type error: Property 'X' does not exist
```

**Solution:**

```bash
# Check types
yarn type-check

# Generate types
yarn contentlayer build
```

#### Memory Issues

```bash
JavaScript heap out of memory
```

**Solution:**

```bash
# Increase memory limit
NODE_OPTIONS="--max-old-space-size=4096" yarn build
```

### Runtime Issues

#### 404 Errors

- Check `next.config.js` for correct `basePath`
- Verify routes in `app/` directory
- Check for case sensitivity

#### API Failures

- Verify environment variables
- Check API route handlers
- Review CORS settings

#### Styling Issues

- Clear browser cache
- Check Tailwind config
- Verify CSS imports

## Best Practices

### 1. Security

```javascript
// Security headers in next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
]
```

### 2. Performance

- Enable ISR for dynamic content
- Use static generation where possible
- Optimize images with Next.js Image
- Minimize JavaScript bundles
- Use edge functions for API routes

### 3. Caching

```javascript
// Cache headers for static assets
module.exports = {
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### 4. Monitoring

- Set up alerts for:
  - Build failures
  - Performance degradation
  - Error rate spikes
  - Traffic anomalies

### 5. Rollback Strategy

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]

# Or use Vercel Dashboard
# Project Settings > Deployments > Rollback
```

## Production Optimizations

### 1. Enable SWC Minification

```javascript
// next.config.js
module.exports = {
  swcMinify: true,
}
```

### 2. Optimize Fonts

```typescript
// app/fonts.ts
import { Inter, Space_Grotesk } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

### 3. Image Optimization

```tsx
// Use Next.js Image component
import Image from 'next/image'

;<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={dataUrl}
/>
```

### 4. Bundle Analysis

```bash
# Analyze bundle size
yarn analyze

# Review output in .next/analyze/
```

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: yarn install

      - name: Build
        run: yarn build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Related Documentation

- [Infrastructure Guide](./infrastructure.md) - Detailed infrastructure setup
- [Monitoring Guide](./monitoring.md) - Comprehensive monitoring setup
- [Security Guide](../guides/security.md) - Security best practices
- [Performance Guide](../guides/performance.md) - Performance optimization
