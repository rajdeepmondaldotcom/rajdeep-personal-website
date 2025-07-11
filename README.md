# Rajdeep Mondal — Personal Website & Blog

[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)

This repository contains the source code for my personal website, blog, and portfolio, available at **[rajdeepmondal.com](https://www.rajdeepmondal.com)**.

---

## About This Project

This project serves as a central hub for my digital presence. Its primary goals are:

1.  To publish long-form articles and technical guides using MDX.
2.  To showcase a curated list of my software projects and professional work.
3.  To serve as a sandbox for learning and implementing modern web technologies, including the Next.js App Router, Contentlayer, and Vercel's observability tools.

Feel free to fork this repository or use it as inspiration for your own projects.

---

## Getting Started

To run this project locally, follow these steps.

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/rajdeepmondaldotcom/rajdeep-personal-website.git
    cd rajdeep-personal-website
    ```

2.  **Set the Node.js Version**
    This project requires Node.js version 18.x. If you use Node Version Manager (`nvm`), you can switch to the correct version by running:
    ```bash
    nvm use
    ```

3.  **Install Dependencies**
    This project uses Yarn for package management.
    ```bash
    yarn install
    ```

4.  **Configure Environment Variables**
    Copy the example environment file to create your local configuration:
    ```bash
    cp .env.example .env.local
    ```
    Then, open `.env.local` and add any necessary values, such as those required for the commenting system.

5.  **Run the Development Server**
    ```bash
    yarn dev
    ```
    The application will be available at `http://localhost:3000`.

---

## Environment Variables

| Variable               | Required | Description                                                                 |
| ---------------------- | -------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes      | The canonical URL of your site. Use `http://localhost:3000` for local development. |
| `BASE_PATH`            | No       | Set this if the site is hosted in a subdirectory of a domain.               |
| `NEXT_PUBLIC_GISCUS_*` | No       | Required only if you intend to use the Giscus commenting system.            |

---

## Available Scripts

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `yarn dev`     | Starts the local development server.         |
| `yarn build`   | Creates a production-ready build.            |
| `yarn start`   | Starts the application from a production build. |
| `yarn lint`    | Runs ESLint to identify and fix code issues. |
| `yarn format`  | Formats all code using Prettier.             |
| `yarn analyze` | Generates a bundle size analysis report.     |

---

## Technology Stack

-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS with `clsx` and `cva` for component variants
-   **Content**: Contentlayer for transforming MDX and Markdown into type-safe JSON
-   **Observability**: Vercel Web Analytics and Vercel Speed Insights
-   **UI**: Sonner for toast notifications

---

## Project Structure

```
.
├── app/                 # Next.js app routes, layouts, and API endpoints
├── components/          # Reusable React components
│   └── ui/              # Core UI elements built with Tailwind CSS
├── data/                # Site content and configuration files
├── public/              # Static assets like images and favicons
├── css/                 # Global stylesheets and theme files
└── scripts/             # Utility scripts for builds and maintenance
```

---

## Content Management

### Blog Posts

To add a new blog post, create a `.mdx` file in the `data/blog/` directory with the following front-matter:

```md
---
title: "Your Post Title"
date: "2025-01-01"
tags: ["nextjs", "react"]
draft: false
summary: "A one-sentence summary of the article."
authors: ["default"]
---

Your content starts here.
```

### Projects

To add a new project to your portfolio, edit the `data/projectsData.ts` file:

```ts
{
  title: 'Project Title',
  description: 'A brief description of the project.',
  imgSrc: '/static/images/your-project-image.png',
  href: 'https://github.com/your-username/your-project',
}
```

---

## Deployment

This project is optimized for deployment on Vercel.

1.  **Import Repository**: Connect your GitHub repository to Vercel.
2.  **Configure Environment Variables**: Add any variables from your `.env.local` file to the Vercel project settings.
3.  **Deploy**: Vercel will automatically build and deploy the site upon each push to the `main` branch.

---

## Troubleshooting

**Error: "The lockfile would have been modified by this install..."**

This error typically occurs if the `yarn.lock` file is inconsistent with the Vercel build environment. To resolve it, regenerate the lockfile locally, commit the changes, and redeploy.

```bash
rm yarn.lock
yarn install
git add yarn.lock
git commit -m "fix: regenerate yarn.lock"
git push
```

---

## Acknowledgements

This project is based on the [Pliny](https://github.com/tailwindlabs/pliny) starter kit by Tailwind Labs. It has been heavily customized, including a migration to the Next.js App Router, the addition of new UI components, and integration with Vercel's observability suite.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
