# Rajdeep Mondal — Website & Blog

[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)

Source code for **[rajdeepmondal.com](https://www.rajdeepmondal.com)**.

This project serves three main purposes:
1.  Publish technical articles using MDX.
2.  Showcase my software projects and professional work.
3.  Act as a learning sandbox for modern web technologies.

---

## Local Development

1.  **Clone & Enter**:
    ```bash
    git clone https://github.com/rajdeepmondaldotcom/rajdeep-personal-website.git
    cd rajdeep-personal-website
    ```
2.  **Set Node Version**:
    ```bash
    nvm use  # Requires Node v18.x (see .nvmrc)
    ```
3.  **Install Dependencies**:
    ```bash
    yarn install
    ```
4.  **Set Environment Variables**:
    ```bash
    cp .env.example .env.local
    ```
5.  **Run Dev Server**:
    ```bash
    yarn dev
    ```
    The site will be available at `http://localhost:3000`.

---

## Content Management

-   **Blog Posts**: Add `.mdx` files to `data/blog/`.
-   **Projects**: Edit the array in `data/projectsData.ts`.
-   **Site Metadata**: Modify `data/siteMetadata.js`.

---

## Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, `clsx`, `cva`
-   **Content**: Contentlayer (MDX to JSON)
-   **Observability**: Vercel Analytics & Speed Insights

---

## Deployment

This site is optimized for Vercel. Connect your repository, add environment variables from `.env.local`, and push to `main` to deploy.

---

## Troubleshooting

**Error**: `The lockfile would have been modified by this install...`

This indicates an inconsistency between your local `yarn.lock` and Vercel's build environment. To fix it, regenerate the lockfile:
```bash
rm yarn.lock
yarn install
git add yarn.lock
git commit -m "fix: regenerate yarn.lock"
git push
```

---

## License

[MIT](LICENSE)
