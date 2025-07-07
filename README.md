# Rajdeep Mondal - Personal Website

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Personal website and blog built with Next.js, TypeScript, and Tailwind CSS. Features responsive design, dark/light mode, blog system with MDX support, and optimized performance.

## Prerequisites

- Node.js 18.0.0 or higher
- Yarn 3.0.0 or higher

## Quick Setup

### Automated Setup (Recommended)

```bash
# Make script executable and run
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Manual Setup

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Development Commands

| Command        | Description               |
| -------------- | ------------------------- |
| `yarn dev`     | Start development server  |
| `yarn build`   | Build for production      |
| `yarn start`   | Start production server   |
| `yarn lint`    | Run ESLint and fix issues |
| `yarn format`  | Format code with Prettier |
| `yarn analyze` | Analyze bundle size       |

## Environment Configuration

Create `.env.local` in the root directory:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BASE_PATH=

# Analytics (Optional)
# NEXT_UMAMI_ID=your-umami-id-here
# NEXT_PUBLIC_GOOGLE_ANALYTICS=your-google-analytics-id

# Comments (Optional - Giscus)
# NEXT_PUBLIC_GISCUS_REPO=rajdeepmondaldotcom/rajdeep-personal-website
# NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your-repository-id
# NEXT_PUBLIC_GISCUS_CATEGORY=General
# NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id

NODE_ENV=development
```

## Content Management

### Adding Blog Posts

Create new files in `data/blog/` directory:

```markdown
---
title: 'Your Blog Post Title'
date: '2024-01-15'
tags: ['nextjs', 'react', 'web development']
draft: false
summary: 'Brief description of your post'
authors: ['default']
---

Your content here...
```

### Adding Projects

Edit `data/projectsData.ts`:

```typescript
{
  title: 'Project Name',
  description: 'Project description',
  imgSrc: '/static/images/project-image.jpg',
  href: 'https://github.com/rajdeepmondaldotcom/project-name',
}
```

### Site Configuration

Edit `data/siteMetadata.js` to update:

- Site title and description
- Author information
- Social media links
- Analytics settings

### Navigation

Modify `data/headerNavLinks.ts` to customize menu items:

```typescript
const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/about', title: 'About' },
  { href: '/projects', title: 'Projects' },
  { href: '/blog', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
]
```

## Project Structure

```
rajdeep-personal-website/
├── app/                    # Next.js App Router pages
├── components/            # React components
├── data/                  # Content and configuration
│   ├── blog/              # Blog posts (markdown)
│   ├── authors/           # Author information
│   ├── siteMetadata.js    # Site configuration
│   └── projectsData.ts    # Projects data
├── layouts/               # Page layout components
├── public/static/         # Static assets (images, etc.)
├── css/                   # Styles and themes
└── scripts/               # Build and utility scripts
```

## Key Configuration Files

- `data/siteMetadata.js` - Main site configuration
- `data/authors/default.mdx` - Your author profile
- `data/headerNavLinks.ts` - Navigation menu
- `tailwind.config.js` - Styling configuration
- `next.config.js` - Next.js configuration

## Styling

- **Global styles**: `css/tailwind.css`
- **Code highlighting**: `css/prism.css`
- **Theme colors**: Edit `tailwind.config.js`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically on push

### Static Export

```bash
# Build for static hosting
EXPORT=1 UNOPTIMIZED=1 yarn build

# Deploy the 'out' folder
```

## Development Workflow

1. **Start development**: `yarn dev`
2. **Make changes**: Edit files in `app/`, `components/`, or `data/`
3. **Test locally**: View at http://localhost:3000
4. **Format code**: `yarn format`
5. **Build and test**: `yarn build`
6. **Deploy**: Push to GitHub for automatic deployment

## Troubleshooting

### Common Issues

- **Port already in use**: Kill the process or use a different port
- **Build errors**: Run `yarn lint` to check for issues
- **Styling issues**: Clear `.next` cache and restart dev server

### Useful Commands

```bash
# Clear cache and restart
rm -rf .next .contentlayer
yarn dev

# Check for issues
yarn lint:check
yarn format:check

# Test production build
yarn build
yarn start
```

## Features

- Responsive design with dark/light mode
- Blog system with MDX support and syntax highlighting
- SEO optimized with meta tags and structured data
- Analytics integration (Google Analytics, Umami, Plausible)
- Comment system via Giscus
- Command palette search
- RSS feed generation
- Performance optimized

## Contact

- Website: [https://www.rajdeepmondal.com](https://www.rajdeepmondal.com)
- Email: [rajdeep@rajdeepmondal.com](mailto:rajdeep@rajdeepmondal.com)
- GitHub: [@rajdeepmondaldotcom](https://github.com/rajdeepmondaldotcom)
- LinkedIn: [/in/rajdeep-mondal](https://www.linkedin.com/in/rajdeep-mondal/)

## License

MIT License - see [LICENSE](LICENSE) file for details.
