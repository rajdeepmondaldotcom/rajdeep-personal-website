# Getting Started

> Complete guide to set up your development environment for Rajdeep Personal Website

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v20.x or higher ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **Code Editor** (Recommended: [VS Code](https://code.visualstudio.com/))
- **Yarn** v3.x or higher (installed automatically)

### Verify Prerequisites

```bash
# Check Node.js version
node --version  # Should output v20.x or higher

# Check Git
git --version   # Should output git version

# Check Yarn (will be installed if missing)
yarn --version  # Should output 3.x or higher
```

## Quick Start

Get up and running in under 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/rajdeepmondaldotcom/rajdeep-personal-website.git
cd rajdeep-personal-website

# 2. Install dependencies
yarn install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Start development server
yarn dev

# 5. Open http://localhost:3000
```

## Detailed Setup

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/rajdeepmondaldotcom/rajdeep-personal-website.git

# Using SSH (if you have SSH keys set up)
git clone git@github.com:rajdeepmondaldotcom/rajdeep-personal-website.git

# Navigate to project
cd rajdeep-personal-website
```

### 2. Install Dependencies

The project uses Yarn v3 with Plug'n'Play for fast, reliable dependency management:

```bash
# Install all dependencies
yarn install

# If yarn is not installed globally
npm install -g yarn
```

### 3. Environment Configuration

Create a `.env.local` file for local development:

```bash
# Copy example environment file
cp .env.example .env.local
```

Update `.env.local` with your values:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BASE_PATH=

# Analytics (Optional)
NEXT_UMAMI_ID=your-umami-id
NEXT_PUBLIC_GOOGLE_ANALYTICS=your-ga-id

# Newsletter (Optional)
CONVERTKIT_API_KEY=your-convertkit-key
CONVERTKIT_FORM_ID=your-form-id

# Comments (Optional)
NEXT_PUBLIC_GISCUS_REPO=username/repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

### 4. IDE Setup

#### VS Code (Recommended)

1. Install recommended extensions:

   ```bash
   code --install-extension dbaeumer.vscode-eslint
   code --install-extension esbenp.prettier-vscode
   code --install-extension bradlc.vscode-tailwindcss
   code --install-extension ms-vscode.vscode-typescript-next
   ```

2. Use workspace settings:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "typescript.tsdk": "node_modules/typescript/lib",
     "typescript.enablePromptUseWorkspaceTsdk": true
   }
   ```

## Project Structure

```
rajdeep-personal-website/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── projects/          # Projects page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── *.tsx             # Feature components
├── data/                  # Content and configuration
│   ├── blog/             # Blog posts (MDX)
│   ├── authors/          # Author profiles
│   └── siteMetadata.js   # Site configuration
├── layouts/              # Page layouts
├── lib/                  # Utilities and services
│   ├── services/         # Data services
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Helper functions
├── public/               # Static assets
│   └── static/           # Images, favicons
├── styles/               # Global styles
└── contentlayer.config.ts # Content configuration
```

## Development Workflow

### 1. Starting Development

```bash
# Start development server
yarn dev

# Server runs on http://localhost:3000
# - Hot reload enabled
# - Error overlay
# - Fast refresh
```

### 2. Making Changes

#### Adding a Blog Post

1. Create a new MDX file in `data/blog/`:

   ```bash
   touch data/blog/my-new-post.mdx
   ```

2. Add frontmatter and content:

   ```mdx
   ---
   title: 'My New Post'
   date: '2024-01-01'
   tags: ['javascript', 'react']
   draft: false
   summary: 'This is my new blog post'
   ---

   ## Introduction

   Your content here...
   ```

#### Creating a Component

1. Create component file:

   ```bash
   touch components/MyComponent.tsx
   ```

2. Implement component:

   ```tsx
   export default function MyComponent() {
     return <div>My Component</div>
   }
   ```

3. Use component:
   ```tsx
   import MyComponent from '@/components/MyComponent'
   ```

### 3. Code Quality

The project enforces code quality through:

```bash
# Run linter
yarn lint

# Run formatter
yarn format

# Type checking
yarn type-check

# Run all checks
yarn validate
```

Git hooks automatically run these checks before commits.

## Common Tasks

### Running Scripts

```bash
# Development
yarn dev          # Start dev server
yarn build        # Build for production
yarn start        # Start production server

# Code Quality
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint issues
yarn format       # Format with Prettier
yarn format:check # Check formatting

# Testing
yarn test         # Run tests
yarn test:watch   # Run tests in watch mode
yarn test:coverage # Generate coverage report

# Analysis
yarn analyze      # Analyze bundle size
```

### Content Management

#### Blog Posts

- Location: `data/blog/`
- Format: MDX (Markdown + JSX)
- Naming: `kebab-case.mdx`

#### Images

- Location: `public/static/images/`
- Optimization: Use Next.js Image component
- Format: WebP, PNG, JPG

#### Projects

- Edit: `data/projectsData.ts`
- Add project objects to the array

### Debugging

1. **Browser DevTools**
   - React Developer Tools
   - Network tab for API calls
   - Console for errors

2. **VS Code Debugging**

   ```json
   {
     "type": "node",
     "request": "launch",
     "name": "Next.js",
     "skipFiles": ["<node_internals>/**"],
     "program": "${workspaceFolder}/node_modules/.bin/next",
     "args": ["dev"],
     "env": {
       "NODE_OPTIONS": "--inspect"
     }
   }
   ```

3. **Server Logs**
   - Check terminal for server-side errors
   - Use `console.log` for debugging
   - Enable verbose logging: `DEBUG=* yarn dev`

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Error: Port 3000 is already in use

# Solution 1: Use different port
PORT=3001 yarn dev

# Solution 2: Kill process on port 3000
npx kill-port 3000
```

#### Module Not Found

```bash
# Error: Module not found

# Solution: Clear cache and reinstall
rm -rf .next node_modules
yarn install
yarn dev
```

#### TypeScript Errors

```bash
# Error: Type errors

# Solution: Restart TS server in VS Code
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

#### Build Failures

```bash
# Error: Build failed

# Solution: Clean build
rm -rf .next .contentlayer
yarn build
```

### Getting Help

1. Check [FAQ](../guides/faq.md)
2. Search [GitHub Issues](https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/issues)
3. Ask in [Discussions](https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/discussions)
4. Read [Next.js Docs](https://nextjs.org/docs)

## Next Steps

Now that you're set up:

1. Read [Development Workflow](./workflow.md)
2. Review [Code Style Guide](../contributing/code-style.md)
3. Explore [Component Library](../components/README.md)
4. Check [Architecture Overview](../architecture/overview.md)

---

<div align="center">
  <strong>Happy Coding! 🚀</strong>
</div>
