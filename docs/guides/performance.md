# Performance Optimization Guide

> Complete guide to optimizing performance for maximum speed and user experience

## Table of Contents

- [Performance Metrics](#performance-metrics)
- [Build-Time Optimizations](#build-time-optimizations)
- [Runtime Optimizations](#runtime-optimizations)
- [Image Optimization](#image-optimization)
- [Code Optimization](#code-optimization)
- [Caching Strategies](#caching-strategies)
- [Monitoring & Analysis](#monitoring--analysis)
- [Performance Checklist](#performance-checklist)

## Performance Metrics

### Core Web Vitals

Monitor these key metrics:

1. **LCP (Largest Contentful Paint)** - Target: < 2.5s
2. **FID (First Input Delay)** - Target: < 100ms
3. **CLS (Cumulative Layout Shift)** - Target: < 0.1
4. **TTFB (Time to First Byte)** - Target: < 600ms
5. **FCP (First Contentful Paint)** - Target: < 1.8s

### Measuring Performance

```typescript
// app/components/WebVitals.tsx
import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to analytics
    console.log(metric)

    // Send to analytics service
    window.gtag?.('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    })
  })
}
```

## Build-Time Optimizations

### 1. Static Generation

Prefer static generation over server-side rendering:

```typescript
// ✅ Good - Static Generation
export default async function Page() {
  const posts = await getPosts() // Runs at build time
  return <BlogList posts={posts} />
}

// ❌ Avoid - Dynamic rendering
export default async function Page() {
  const user = await getCurrentUser() // Runs on each request
  return <Dashboard user={user} />
}
```

### 2. Bundle Size Optimization

#### Tree Shaking

```typescript
// ✅ Good - Named imports
import { format } from 'date-fns'

// ❌ Bad - Default import of entire library
import * as dateFns from 'date-fns'
```

#### Dynamic Imports

```typescript
// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // Disable SSR if not needed
})

// Conditional loading
const AdminPanel = dynamic(() =>
  user.isAdmin ? import('./AdminPanel') : Promise.resolve(() => null)
)
```

### 3. Next.js Configuration

```javascript
// next.config.js
module.exports = {
  // Enable SWC minification
  swcMinify: true,

  // Optimize packages
  experimental: {
    optimizePackageImports: ['lucide-react', 'lodash', 'date-fns', '@headlessui/react'],
  },

  // Compression
  compress: true,

  // Optimize CSS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
```

## Runtime Optimizations

### 1. React Optimizations

#### Memoization

```typescript
// Memoize expensive components
const ExpensiveComponent = memo(({ data }) => {
  return <ComplexVisualization data={data} />
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.data.id === nextProps.data.id
})

// Memoize expensive calculations
function Component({ items }) {
  const sortedItems = useMemo(
    () => items.sort((a, b) => b.date - a.date),
    [items]
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  )
}
```

#### Optimize Re-renders

```typescript
// Use useCallback for stable function references
const handleClick = useCallback((id: string) => {
  setSelectedId(id)
}, [])

// Split state to minimize re-renders
function Component() {
  // ❌ Bad - Everything re-renders on any change
  const [state, setState] = useState({
    user: null,
    posts: [],
    comments: [],
  })

  // ✅ Good - Isolated state updates
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
}
```

### 2. List Virtualization

For long lists, use virtualization:

```typescript
import { FixedSizeList } from 'react-window'

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  )

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}
```

## Image Optimization

### 1. Next.js Image Component

```typescript
import Image from 'next/image'

// ✅ Optimized image loading
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL={dataUrl}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 2. Image Formats

```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

### 3. Lazy Loading

```typescript
// Manual lazy loading for custom components
const LazyImage = ({ src, alt }) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef}>
      {isIntersecting && <img src={src} alt={alt} />}
    </div>
  )
}
```

## Code Optimization

### 1. Font Optimization

```typescript
// app/fonts.ts
import { Inter, Roboto_Mono } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  preload: true,
})
```

### 2. CSS Optimization

```typescript
// Use CSS Modules for better tree-shaking
import styles from './Component.module.css'

// Tailwind CSS with PurgeCSS
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // Remove unused styles
}
```

### 3. JavaScript Optimization

```typescript
// Debounce expensive operations
const debouncedSearch = useMemo(
  () =>
    debounce((query: string) => {
      searchAPI(query)
    }, 300),
  []
)

// Throttle scroll handlers
const throttledScroll = useMemo(
  () =>
    throttle(() => {
      updateScrollPosition()
    }, 100),
  []
)
```

## Caching Strategies

### 1. Static Asset Caching

```javascript
// next.config.js
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
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=59',
          },
        ],
      },
    ]
  },
}
```

### 2. Data Caching

```typescript
// In-memory cache for expensive operations
const cache = new Map()

export function getCachedData(key: string) {
  if (cache.has(key)) {
    return cache.get(key)
  }

  const data = expensiveOperation()
  cache.set(key, data)

  // Clear after 5 minutes
  setTimeout(() => cache.delete(key), 5 * 60 * 1000)

  return data
}
```

### 3. Service Worker Caching

```javascript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(['/', '/static/css/main.css', '/static/js/main.js'])
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
```

## Monitoring & Analysis

### 1. Bundle Analysis

```bash
# Analyze bundle size
yarn analyze

# Check bundle composition
npx @next/bundle-analyzer
```

### 2. Performance Monitoring

```typescript
// Real User Monitoring (RUM)
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (metric.label === 'web-vital') {
    // Send to analytics
    analytics.track('Web Vitals', {
      metric: metric.name,
      value: metric.value,
      id: metric.id,
    })
  }
}
```

### 3. Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://rajdeepmondal.com
            https://rajdeepmondal.com/blog
          uploadArtifacts: true
```

## Performance Checklist

### Build Time

- [ ] Enable static generation where possible
- [ ] Minimize bundle size with tree shaking
- [ ] Use dynamic imports for code splitting
- [ ] Optimize dependencies with `optimizePackageImports`
- [ ] Enable SWC minification

### Images

- [ ] Use Next.js Image component
- [ ] Provide appropriate sizes
- [ ] Use modern formats (WebP, AVIF)
- [ ] Implement lazy loading
- [ ] Add blur placeholders

### Code

- [ ] Memoize expensive components
- [ ] Optimize re-renders
- [ ] Debounce/throttle event handlers
- [ ] Use virtualization for long lists
- [ ] Remove console logs in production

### Caching

- [ ] Configure static asset caching
- [ ] Implement data caching strategy
- [ ] Use ISR for dynamic content
- [ ] Configure CDN caching headers

### Monitoring

- [ ] Set up Web Vitals tracking
- [ ] Monitor bundle size
- [ ] Run Lighthouse audits
- [ ] Track real user metrics
- [ ] Set up performance budgets

## Performance Budget

Set limits to prevent regression:

```javascript
// budget.json
{
  "bundles": [
    {
      "name": "main",
      "maxSize": "200 KB"
    },
    {
      "name": "vendor",
      "maxSize": "150 KB"
    }
  ],
  "metrics": {
    "LCP": 2500,
    "FID": 100,
    "CLS": 0.1
  }
}
```

## Related Documentation

- [Architecture Overview](../architecture/overview.md) - System design
- [Deployment Guide](../deployment/README.md) - Production setup
- [Monitoring Guide](../deployment/monitoring.md) - Performance tracking
- [Troubleshooting](./troubleshooting.md) - Common issues
