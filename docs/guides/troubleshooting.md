# Troubleshooting Guide

> Comprehensive guide to diagnosing and fixing common issues

## Table of Contents

- [Development Issues](#development-issues)
- [Build Errors](#build-errors)
- [Runtime Errors](#runtime-errors)
- [Content Issues](#content-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)
- [Environment Issues](#environment-issues)
- [Getting Help](#getting-help)

## Development Issues

### Port Already in Use

**Error:**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

1. **Kill the process using the port:**

   ```bash
   # Find process
   lsof -i :3000

   # Kill process
   kill -9 <PID>

   # Or use npx
   npx kill-port 3000
   ```

2. **Use a different port:**
   ```bash
   PORT=3001 yarn dev
   ```

### Module Not Found

**Error:**

```
Module not found: Can't resolve '@/components/Header'
```

**Solutions:**

1. **Check file exists and path is correct:**

   ```bash
   ls components/Header.tsx
   ```

2. **Clear cache and reinstall:**

   ```bash
   rm -rf .next node_modules .yarn/cache
   yarn install
   yarn dev
   ```

3. **Check import paths in `tsconfig.json`:**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/components/*": ["components/*"]
       }
     }
   }
   ```

### TypeScript Errors

**Error:**

```
Type error: Property 'X' does not exist on type 'Y'
```

**Solutions:**

1. **Restart TypeScript server:**
   - VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"

2. **Generate types:**

   ```bash
   yarn contentlayer build
   ```

3. **Check for missing type definitions:**
   ```bash
   yarn add -D @types/package-name
   ```

### Hot Reload Not Working

**Solutions:**

1. **Check file watching limits (Linux/WSL):**

   ```bash
   # Check current limit
   cat /proc/sys/fs/inotify/max_user_watches

   # Increase limit
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

2. **Clear Next.js cache:**

   ```bash
   rm -rf .next
   yarn dev
   ```

3. **Check for syntax errors in files**

## Build Errors

### Out of Memory

**Error:**

```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Solutions:**

1. **Increase memory limit:**

   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" yarn build
   ```

2. **Use `.env` file:**
   ```env
   # .env.local
   NODE_OPTIONS=--max-old-space-size=4096
   ```

### Build Timeouts

**Error:**

```
Error: The build exceeded the maximum time
```

**Solutions:**

1. **Optimize build:**
   - Remove unused dependencies
   - Optimize images
   - Check for infinite loops

2. **Split large components:**
   ```tsx
   // Use dynamic imports
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <Skeleton />,
   })
   ```

### ESLint Errors

**Error:**

```
ESLint: X problems (Y errors, Z warnings)
```

**Solutions:**

1. **Auto-fix issues:**

   ```bash
   yarn lint:fix
   ```

2. **Check specific file:**

   ```bash
   yarn eslint path/to/file.tsx
   ```

3. **Disable rule for line:**
   ```tsx
   // eslint-disable-next-line rule-name
   const value = problematicCode()
   ```

## Runtime Errors

### 404 Page Not Found

**Solutions:**

1. **Check file naming:**
   - Files should be lowercase
   - Use hyphens, not underscores
   - Check for typos

2. **Verify route structure:**

   ```
   app/
   ├── blog/
   │   ├── page.tsx         # /blog
   │   └── [...slug]/
   │       └── page.tsx     # /blog/post-slug
   ```

3. **Clear cache:**
   ```bash
   rm -rf .next
   yarn build
   yarn start
   ```

### Hydration Errors

**Error:**

```
Error: Hydration failed because the initial UI does not match what was rendered on the server
```

**Solutions:**

1. **Check for browser-only code:**

   ```tsx
   // ❌ Bad
   const width = window.innerWidth

   // ✅ Good
   const [width, setWidth] = useState(0)
   useEffect(() => {
     setWidth(window.innerWidth)
   }, [])
   ```

2. **Use dynamic imports for client components:**

   ```tsx
   const ClientComponent = dynamic(() => import('./ClientComponent'), {
     ssr: false,
   })
   ```

3. **Check for date/time rendering:**
   ```tsx
   // Use consistent formatting
   const date = new Date().toISOString()
   ```

### API Route Errors

**Error:**

```
API resolved without sending a response
```

**Solutions:**

1. **Ensure response is sent:**

   ```tsx
   export async function GET() {
     try {
       const data = await fetchData()
       return Response.json(data)
     } catch (error) {
       return Response.json({ error: 'Failed' }, { status: 500 })
     }
   }
   ```

2. **Check async operations:**
   ```tsx
   // Await all promises
   await Promise.all([operation1(), operation2()])
   ```

## Content Issues

### MDX Parsing Errors

**Error:**

```
Error: MDX compilation failed
```

**Solutions:**

1. **Check frontmatter syntax:**

   ```mdx
   ---
   title: 'My Post'
   date: '2024-01-01'
   tags: ['javascript', 'react']
   ---
   ```

2. **Escape special characters:**

   ```mdx
   <!-- Use backticks for inline code -->

   Use `<Component />` syntax

   <!-- Escape curly braces -->

   The object is \{key: value\}
   ```

3. **Validate MDX:**
   ```bash
   yarn contentlayer build --verbose
   ```

### Missing Content

**Solutions:**

1. **Check file location:**

   ```
   data/
   ├── blog/        # Blog posts here
   ├── authors/     # Author profiles here
   ```

2. **Verify frontmatter required fields:**
   - `title` - Required
   - `date` - Required
   - `draft` - Set to `false` for production

3. **Rebuild content:**
   ```bash
   rm -rf .contentlayer
   yarn contentlayer build
   ```

## Deployment Issues

### Vercel Build Failures

**Solutions:**

1. **Check build logs:**
   - Go to Vercel dashboard
   - Click on failed deployment
   - Review build logs

2. **Match local environment:**

   ```bash
   # Use same Node version
   node --version

   # Set in Vercel settings
   ```

3. **Environment variables:**
   - Ensure all required vars are set
   - Check for typos
   - Verify quotes/formatting

### Static Export Errors

**Error:**

```
Error: Page with dynamic server usage cannot be exported
```

**Solutions:**

1. **Use static generation:**

   ```tsx
   // Generate static params
   export async function generateStaticParams() {
     return posts.map((post) => ({
       slug: post.slug,
     }))
   }
   ```

2. **Avoid dynamic functions in static pages:**
   - Don't use `cookies()`
   - Don't use `headers()`
   - Use client components for dynamic content

## Performance Issues

### Slow Page Load

**Solutions:**

1. **Analyze bundle size:**

   ```bash
   yarn analyze
   ```

2. **Optimize images:**

   ```tsx
   import Image from 'next/image'
   ;<Image
     src="/image.jpg"
     alt="Description"
     width={800}
     height={600}
     loading="lazy"
     placeholder="blur"
   />
   ```

3. **Code splitting:**
   ```tsx
   // Dynamic imports
   const Component = dynamic(() => import('./Component'))
   ```

### High Memory Usage

**Solutions:**

1. **Check for memory leaks:**
   - Remove event listeners
   - Clear intervals/timeouts
   - Unsubscribe from observables

2. **Optimize component renders:**

   ```tsx
   // Use memo for expensive components
   const MemoizedComponent = memo(ExpensiveComponent)

   // Use useMemo for expensive calculations
   const result = useMemo(() => expensiveCalculation(data), [data])
   ```

## Environment Issues

### Missing Environment Variables

**Error:**

```
TypeError: Cannot read property 'X' of undefined
```

**Solutions:**

1. **Create `.env.local`:**

   ```bash
   cp .env.example .env.local
   ```

2. **Check variable names:**
   - Must start with `NEXT_PUBLIC_` for client-side
   - Server-side variables don't need prefix

3. **Restart dev server after changes**

### Wrong Environment

**Solutions:**

1. **Check current environment:**

   ```tsx
   console.log('Environment:', process.env.NODE_ENV)
   ```

2. **Set environment explicitly:**
   ```bash
   NODE_ENV=production yarn build
   ```

## Debugging Techniques

### 1. Console Debugging

```tsx
// Add debug logs
console.log('Component rendered with props:', props)

// Use console groups
console.group('API Request')
console.log('URL:', url)
console.log('Response:', response)
console.groupEnd()
```

### 2. React Developer Tools

1. Install browser extension
2. Inspect component tree
3. Check props and state
4. Profile performance

### 3. Network Debugging

1. Open browser DevTools
2. Go to Network tab
3. Check API calls
4. Verify responses

### 4. Source Maps

```javascript
// next.config.js
module.exports = {
  productionBrowserSourceMaps: true,
}
```

## Getting Help

### 1. Search Existing Issues

```bash
# Search in repository
git log --grep="error message"

# Search GitHub issues
# https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/issues
```

### 2. Create Minimal Reproduction

1. Isolate the problem
2. Create minimal example
3. Remove unrelated code
4. Share reproduction steps

### 3. Provide Information

When asking for help, include:

- Error message (full stack trace)
- Environment (OS, Node version, browser)
- Steps to reproduce
- What you've already tried
- Relevant code snippets

### 4. Community Resources

- [GitHub Issues](https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/issues)
- [GitHub Discussions](https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/discussions)
- [Next.js Discord](https://discord.gg/nextjs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

## Quick Reference

### Reset Everything

```bash
# Nuclear option - reset everything
rm -rf node_modules .next .contentlayer .yarn/cache
yarn install
yarn dev
```

### Check Versions

```bash
# Check all versions
node --version
yarn --version
npx next --version
```

### Common Fixes

| Issue            | Quick Fix                     |
| ---------------- | ----------------------------- |
| Port in use      | `npx kill-port 3000`          |
| Module not found | `rm -rf node_modules && yarn` |
| Type errors      | Restart TS server             |
| Build fails      | `rm -rf .next && yarn build`  |
| No hot reload    | Check file watchers limit     |

---

<div align="center">
  <sub>Still stuck? Don't hesitate to <a href="https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/issues/new">open an issue</a>!</sub>
</div>
