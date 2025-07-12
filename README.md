# Rajdeep Mondal — Personal Website & Blog

<div align="center">
  <img src="public/static/images/logo.png" alt="Rajdeep Mondal Logo" width="120" height="120" />
  
  <h3 align="center">My Personal Website & Technical Blog</h3>
  
  <p align="center">
    A modern, performant, and feature-rich personal website built with Next.js 15
    <br />
    <a href="https://rajdeepmondal.com"><strong>Visit Live Site »</strong></a>
    <br />
    <br />
    <a href="https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/issues">Report Bug</a>
    ·
    <a href="https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/issues">Request Feature</a>
    ·
    <a href="docs/INDEX.md">Browse Docs</a>
  </p>

[![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![MDX](https://img.shields.io/badge/MDX-1B1F24?style=for-the-badge&logo=mdx&logoColor=white)](https://mdxjs.com)

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](contributing/CONTRIBUTING.md)

</div>

---

## Overview

This repository contains the source code for my personal website at [rajdeepmondal.com](https://rajdeepmondal.com). It serves three main purposes:

1. **Technical Blog** - Share insights, tutorials, and thoughts on AI, software engineering, and technology
2. **Project Showcase** - Display my professional work, open-source projects, and contributions
3. **Learning Sandbox** - Experiment with cutting-edge web technologies and AI integrations

## Features

### Content & Authoring

- **MDX Support** - Write rich content with React components
- **Syntax Highlighting** - Beautiful code blocks with Prism.js
- **Math Support** - LaTeX equations with KaTeX
- **Tag System** - Organize content with tags and categories
- **Reading Time** - Automatic reading time estimation
- **Full-Text Search** - Fast client-side search with Kbar

### User Experience

- **Dark/Light Mode** - System-aware theme switching
- **Fully Responsive** - Mobile-first design approach
- **Lightning Fast** - Optimized performance with Next.js 15
- **SEO Optimized** - Meta tags, sitemap, and structured data
- **Analytics Ready** - Support for multiple analytics providers
- **Newsletter Integration** - Email subscription support

### Developer Experience

- **TypeScript** - Full type safety across the codebase
- **Tailwind CSS** - Utility-first styling with custom components
- **Modular Architecture** - Clean separation of concerns
- **Testing Ready** - Configured for unit and integration tests
- **CI/CD** - Automated deployments with Vercel
- **Comprehensive Docs** - Detailed documentation for everything

## Tech Stack

### Frontend

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + CSS Modules
- **UI Components:** Custom components + [Radix UI](https://www.radix-ui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

### Content Management

- **MDX Processing:** [Contentlayer](https://contentlayer.dev/)
- **Markdown:** [Remark](https://remark.js.org/) + [Rehype](https://rehype.js.org/)
- **Code Highlighting:** [Prism.js](https://prismjs.com/)
- **Math Rendering:** [KaTeX](https://katex.org/)

### Development Tools

- **Package Manager:** [Yarn Berry](https://yarnpkg.com/) (v3+)
- **Linting:** [ESLint](https://eslint.org/) + Custom Config
- **Formatting:** [Prettier](https://prettier.io/) + Tailwind Plugin
- **Git Hooks:** [Husky](https://typicode.github.io/husky/) + Lint-staged

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- Yarn 3.0.0 or higher
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rajdeepmondaldotcom/rajdeep-personal-website.git
   cd rajdeep-personal-website
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration (see [Environment Variables](#environment-variables))

4. **Run the development server**

   ```bash
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn format       # Format code with Prettier
yarn analyze      # Analyze bundle size
```

## Project Structure

```
rajdeep-personal-website/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # API endpoints
│   ├── blog/              # Blog pages
│   ├── projects/          # Projects showcase
│   └── tags/              # Tag-based filtering
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── MDXComponents.tsx  # MDX component mappings
│   └── ...                # Feature components
├── layouts/              # Page layouts
│   ├── PostLayout.tsx    # Blog post layout
│   └── ListLayout.tsx    # List page layout
├── lib/                  # Utility functions and services
│   ├── services/         # Business logic services
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Helper functions
├── data/                 # Content and configuration
│   ├── blog/             # Blog posts (MDX files)
│   ├── authors/          # Author information
│   └── siteMetadata.js   # Site configuration
├── public/               # Static assets
│   └── static/           # Images, favicons, etc.
├── styles/               # Global styles
└── docs/                 # Project documentation
```

## Content Management

### Writing Blog Posts

Create a new `.mdx` file in `data/blog/`:

````mdx
---
title: 'My Awesome Post'
date: '2024-01-01'
tags: ['javascript', 'react']
draft: false
summary: 'This is an amazing blog post about...'
---

# Introduction

Your content here...

## Code Example

```javascript
const greeting = 'Hello, World!'
console.log(greeting)
```
````

````

See [Content Management Guide](docs/guides/content-management.md) for detailed instructions.

### Adding Projects

Edit `data/projectsData.ts` to add new projects:

```typescript
export const projectsData = [
  {
    title: 'My Project',
    description: 'A brief description of what it does',
    imgSrc: '/static/images/project.png',
    href: 'https://github.com/username/project',
  },
  // ... more projects
];
````

## Customization

### Site Configuration

Edit `data/siteMetadata.js` to customize:

- Site title, description, and metadata
- Social media links
- Analytics configuration
- Comment system settings
- Newsletter provider

### Styling

- Global styles: `css/tailwind.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use Tailwind classes or CSS modules

### Theme Colors

Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

## Environment Variables

Create a `.env.local` file with:

```env
# Analytics (optional)
NEXT_UMAMI_ID=your-umami-id

# Newsletter (optional)
BUTTONDOWN_API_KEY=your-api-key

# Comments (optional)
NEXT_PUBLIC_GISCUS_REPO=your-repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=your-category
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rajdeepmondaldotcom/rajdeep-personal-website)

### Other Platforms

See [Deployment Guide](docs/deployment/README.md) for instructions on:

- Self-hosting
- Docker deployment
- Alternative platforms

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Documentation Index](docs/INDEX.md) - Complete documentation overview
- [Architecture Guide](docs/architecture/overview.md) - System design and patterns
- [Development Guide](docs/development/getting-started.md) - Development workflow
- [Content Guide](docs/guides/content-management.md) - Managing blog content
- [Deployment Guide](docs/deployment/README.md) - Deployment options
- [Contributing Guide](docs/contributing/CONTRIBUTING.md) - How to contribute

## Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/contributing/CONTRIBUTING.md) for details on:

- Code of conduct
- Development process
- Submitting pull requests
- Coding standards

### Quick Contribution Guide

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

Common issues and solutions:

### Installation Issues

```bash
# Clear yarn cache
yarn cache clean

# Reinstall dependencies
rm -rf node_modules yarn.lock
yarn install
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
yarn build
```

For more solutions, see [Troubleshooting Guide](docs/guides/troubleshooting.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) team for the amazing React framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [Tim Lrx](https://www.timlrx.com/) for the inspiration and design ideas
- [All contributors](https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/graphs/contributors) who have helped improve this project

## Contact

- Website: [rajdeepmondal.com](https://rajdeepmondal.com)
- Email: [rajdeep@rajdeepmondal.com](mailto:rajdeep@rajdeepmondal.com)
- Twitter/X: [@\_rajdeepmondal](https://x.com/_rajdeepmondal)
- LinkedIn: [Rajdeep Mondal](https://www.linkedin.com/in/rajdeep-mondal/)
- GitHub: [@rajdeepmondaldotcom](https://github.com/rajdeepmondaldotcom)

---

<div align="center">
  <sub>Built with love by Rajdeep Mondal</sub>
</div>
