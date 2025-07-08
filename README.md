# Rajdeep Mondal - Personal Website

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Personal website and blog built with Next.js, TypeScript, and Tailwind CSS. Features responsive design, dark/light mode, blog system with MDX support, and optimized performance.

## Prerequisites

- Node.js version `18.x` (as specified in `.nvmrc`)
- Yarn version `3.x` or higher

## Local Development Setup

This project includes an automated setup script for Unix-like systems (macOS, Linux). For Windows or manual setup, follow the steps below.

### 1. Set Node.js Version

Ensure you are using the correct Node.js version. If you have `nvm` (Node Version Manager) installed, you can run:

```bash
nvm use
```

This command automatically reads the `.nvmrc` file and switches to the correct Node.js version.

### 2. Install Dependencies

Install the project dependencies using Yarn:

```bash
yarn install
```

### 3. Configure Environment Variables

Create a local environment file by copying the example:

```bash
cp .env.example .env.local
```

Next, open `.env.local` and add your configuration values. For the comment system to work, you must fill in the giscus variables.

```bash
# .env.local

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BASE_PATH=

# Analytics (Optional)
# NEXT_UMAMI_ID=your-umami-id-here

# Comments (Required for blog posts)
# Get these values from your giscus configuration
NEXT_PUBLIC_GISCUS_REPO=your-github-username/your-repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=your-giscus-category
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-giscus-category-id

NODE_ENV=development
```

### 4. Run Development Server

Start the Next.js development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

### 1. Connect Repository to Vercel

Import your GitHub repository into Vercel. It will automatically detect that you are using Next.js and configure the project settings.

### 2. Add Environment Variables

In your Vercel project dashboard, go to **Settings > Environment Variables**. Add the same variables you defined in your `.env.local` file, particularly the `NEXT_PUBLIC_GISCUS_*` variables.

These must be set in the Vercel UI for the deployed site to work correctly.

### 3. Push to Deploy

Vercel will automatically deploy your project every time you push a new commit to the `main` branch.

---

## Troubleshooting

### Vercel Deployment Fails with Lockfile Error

**Error Message:** `The lockfile would have been modified by this install, which is explicitly forbidden.`

This error occurs when the `yarn.lock` file in your repository is out of sync with `package.json`, often due to differences between your local environment and Vercel's build environment.

**Solution:** Regenerate the `yarn.lock` file.

1.  **Ensure you are using the correct Node.js version** (`nvm use`).
2.  **Delete the existing lockfile:**
    ```bash
    rm yarn.lock
    ```
3.  **Re-install dependencies to generate a new lockfile:**
    ```bash
    yarn install
    ```
4.  **Commit the updated `yarn.lock` file and push the changes:**
    ```bash
    git add yarn.lock
    git commit -m "fix: regenerate yarn.lock"
    git push
    ```

This will trigger a new Vercel deployment with a consistent lockfile, which should resolve the build failure.

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
