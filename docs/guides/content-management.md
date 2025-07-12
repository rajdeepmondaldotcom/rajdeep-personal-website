# Content Management Guide

> Complete guide to managing content with MDX and Contentlayer

## Table of Contents

- [Overview](#overview)
- [Blog Posts](#blog-posts)
- [Author Profiles](#author-profiles)
- [MDX Features](#mdx-features)
- [Content Organization](#content-organization)
- [SEO Optimization](#seo-optimization)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)

## Overview

This site uses MDX (Markdown + JSX) for content management with Contentlayer for type-safe content processing.

### Content Structure

```
data/
├── blog/              # Blog posts
│   ├── post-1.mdx
│   ├── post-2.mdx
│   └── ...
├── authors/           # Author profiles
│   └── default.mdx
└── siteMetadata.js    # Site configuration
```

## Blog Posts

### Creating a New Post

1. **Create MDX file** in `data/blog/`:

   ```bash
   touch data/blog/my-new-post.mdx
   ```

2. **Add frontmatter**:

   ```mdx
   ---
   title: 'My Amazing Blog Post'
   date: '2024-01-15'
   lastmod: '2024-01-16'
   tags: ['javascript', 'react', 'nextjs']
   draft: false
   summary: 'A brief description of your post that appears in listings'
   images: ['/static/images/blog/my-post-banner.jpg']
   authors: ['default']
   layout: 'PostLayout'
   canonicalUrl: 'https://rajdeepmondal.com/blog/my-amazing-post'
   ---
   ```

3. **Write content**:

   ````mdx
   ## Introduction

   Welcome to my blog post! This is written in **MDX**.

   ## Code Examples

   Here's a React component:

   ```jsx
   function Greeting({ name }) {
     return <h1>Hello, {name}!</h1>
   }
   ```
   ````

   ## Using Components

   You can even use React components:

   <Newsletter />
   ```

### Frontmatter Fields

| Field          | Type     | Required | Description                   |
| -------------- | -------- | -------- | ----------------------------- |
| `title`        | string   | ✅       | Post title                    |
| `date`         | string   | ✅       | Publication date (YYYY-MM-DD) |
| `tags`         | string[] | ❌       | Array of tag slugs            |
| `lastmod`      | string   | ❌       | Last modified date            |
| `draft`        | boolean  | ❌       | Hide from production          |
| `summary`      | string   | ❌       | Post excerpt                  |
| `images`       | string[] | ❌       | OG/Twitter images             |
| `authors`      | string[] | ❌       | Author slugs                  |
| `layout`       | string   | ❌       | Layout type                   |
| `bibliography` | string   | ❌       | Bibliography file             |
| `canonicalUrl` | string   | ❌       | Canonical URL                 |

### Post Layouts

Choose from three layouts:

1. **PostSimple** - Minimal layout

   ```yaml
   layout: 'PostSimple'
   ```

2. **PostLayout** - Default with sidebar

   ```yaml
   layout: 'PostLayout' # or omit for default
   ```

3. **PostBanner** - With hero image
   ```yaml
   layout: 'PostBanner'
   images: ['/static/images/banner.jpg']
   ```

## Author Profiles

### Creating an Author

1. **Create author file** in `data/authors/`:

   ```bash
   touch data/authors/john-doe.mdx
   ```

2. **Add author data**:

   ```mdx
   ---
   name: John Doe
   avatar: /static/images/authors/john-doe.jpg
   occupation: Software Engineer
   company: Awesome Corp
   email: john@example.com
   twitter: https://twitter.com/johndoe
   linkedin: https://linkedin.com/in/johndoe
   github: https://github.com/johndoe
   ---

   John is a passionate software engineer with over 10 years of experience
   in web development. He loves React, TypeScript, and teaching others.
   ```

### Author Fields

| Field        | Type   | Required | Description       |
| ------------ | ------ | -------- | ----------------- |
| `name`       | string | ✅       | Display name      |
| `avatar`     | string | ❌       | Profile image URL |
| `occupation` | string | ❌       | Job title         |
| `company`    | string | ❌       | Company name      |
| `email`      | string | ❌       | Contact email     |
| `twitter`    | string | ❌       | Twitter URL       |
| `linkedin`   | string | ❌       | LinkedIn URL      |
| `github`     | string | ❌       | GitHub URL        |

## MDX Features

### 1. Syntax Highlighting

````mdx
```javascript
// JavaScript with syntax highlighting
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}
```

```typescript
// TypeScript example
interface User {
  id: string
  name: string
  email: string
}

const getUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
```
````

### 2. GitHub Alerts

```mdx
> [!NOTE]
> Useful information that users should know.

> [!TIP]
> Helpful advice for doing things better.

> [!IMPORTANT]
> Key information users need to know.

> [!WARNING]
> Urgent info that needs immediate attention.

> [!CAUTION]
> Advises about risks or negative outcomes.
```

### 3. Math Equations

```mdx
Inline math: $E = mc^2$

Block math:

$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$
```

### 4. Tables

```mdx
| Feature    | Support | Notes             |
| ---------- | ------- | ----------------- |
| MDX 2.0    | ✅      | Full support      |
| React 18   | ✅      | Server components |
| TypeScript | ✅      | Type-safe         |
```

### 5. Custom Components

```mdx
import { Newsletter } from '@/components/NewsletterForm'
import { Button } from '@/components/ui/button'

## Subscribe to Newsletter

<Newsletter title="Get weekly updates" />

<Button variant="primary" size="lg">
  Click me!
</Button>
```

## Content Organization

### 1. File Naming

- Use kebab-case: `my-awesome-post.mdx`
- Include date for chronological ordering: `2024-01-15-new-features.mdx`
- Keep URLs short and descriptive

### 2. Tags

Organize content with tags:

```yaml
tags: ['web-development', 'javascript', 'react', 'tutorial']
```

Common tag categories:

- **Languages**: javascript, typescript, python
- **Frameworks**: react, nextjs, nodejs
- **Topics**: tutorial, opinion, announcement
- **Level**: beginner, intermediate, advanced

### 3. Series

Link related posts:

```mdx
---
title: 'React Hooks Series: Part 1 - useState'
series: 'React Hooks Series'
seriesOrder: 1
---

> This is part 1 of the [React Hooks Series](/tags/react-hooks-series)
```

## SEO Optimization

### 1. Meta Tags

```yaml
---
title: 'SEO-Optimized Title (50-60 chars)'
summary: 'Compelling meta description that summarizes the post (150-160 chars)'
images: ['/static/images/og-image.jpg'] # 1200x630px
---
```

### 2. Structured Data

Automatically generated for each post:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-16",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "description": "Post summary"
}
```

### 3. URL Structure

- Keep URLs short and descriptive
- Use hyphens, not underscores
- Avoid special characters
- Include primary keyword

## Advanced Features

### 1. Table of Contents

Automatically generated from headings:

```mdx
## This becomes a TOC entry {#custom-id}

### This is a sub-entry

#### This won't appear in TOC (h4+)
```

### 2. Reading Time

Automatically calculated and displayed. To customize:

```typescript
// contentlayer.config.ts
readingTime: {
  wordsPerMinute: 200,  // Default: 200
}
```

### 3. Related Posts

Add related posts section:

```mdx
---
relatedPosts: ['post-slug-1', 'post-slug-2']
---
```

### 4. Bibliography

For academic posts:

```yaml
---
bibliography: references-data.bib
---
According to research [@smith2023], ...
```

### 5. Code Titles

````mdx
```javascript title="utils/formatDate.js"
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(date)
}
```
````

### 6. Image Optimization

```mdx
![Alt text](/static/images/photo.jpg)

<!-- With caption -->

![Alt text](/static/images/photo.jpg)
_Image caption goes here_

<!-- Using Next.js Image component -->

<Image src="/static/images/photo.jpg" alt="Description" width={800} height={600} />
```

## Best Practices

### 1. Writing Style

- **Clear headings**: Use descriptive, hierarchical headings
- **Short paragraphs**: 2-4 sentences per paragraph
- **Active voice**: More engaging and direct
- **Code examples**: Include practical, runnable examples
- **Visual breaks**: Use images, lists, and callouts

### 2. Content Structure

```mdx
---
frontmatter...
---

## Introduction

Brief overview and what readers will learn

## Prerequisites

What readers should know

## Main Content

Step-by-step explanation with examples

## Conclusion

Summary and next steps

## References

Links to additional resources
```

### 3. Performance

- **Optimize images**: Use WebP/AVIF, appropriate sizes
- **Lazy load embeds**: Use dynamic imports for heavy components
- **Minimize dependencies**: Import only what you need
- **Code splitting**: Break up large posts

### 4. Accessibility

- **Alt text**: Always include for images
- **Heading hierarchy**: Don't skip levels
- **Link text**: Descriptive, not "click here"
- **Language**: Simple, clear explanations
- **Code contrast**: Ensure syntax highlighting is readable

## Troubleshooting

### Common Issues

1. **Build fails after adding post**
   - Check frontmatter syntax
   - Verify date format (YYYY-MM-DD)
   - Ensure required fields present

2. **MDX compilation errors**
   - Check for unclosed JSX tags
   - Escape special characters: `{`, `}`
   - Verify component imports

3. **Images not showing**
   - Check file exists in `public/static/images/`
   - Use correct path (starts with `/`)
   - Verify file extension

4. **Post not appearing**
   - Set `draft: false` for production
   - Check date is not in future
   - Rebuild: `yarn build`

### Debug Commands

```bash
# Rebuild content
yarn contentlayer build

# Check for errors
yarn contentlayer build --verbose

# Clear cache
rm -rf .contentlayer
```

## Related Documentation

- [MDX Documentation](https://mdxjs.com/)
- [Contentlayer Docs](https://contentlayer.dev/)
- [Component Library](../components/README.md)
- [SEO Guide](./seo.md)
