# Deployment Guide

## ✅ Latest Update (December 2024)
This repository has been comprehensively optimized for Vercel deployment with all dependency issues resolved in commit `f7b8bda`.

## GitHub Setup

1. **Create Repository on GitHub:**
   - Go to [GitHub](https://github.com/new)
   - Repository name: `rajdeep-personal-website`
   - Description: "Personal website of Rajdeep Mondal - Software Engineer, Developer, and Tech Enthusiast"
   - Set to Public
   - Don't initialize with README (we already have one)

2. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/rajdeepmondaldotcom/rajdeep-personal-website.git
   git push -u origin main
   ```

## Vercel Deployment

1. **Connect Repository:**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import from GitHub: `rajdeepmondaldotcom/rajdeep-personal-website`

2. **Environment Variables (Optional):**
   - Copy variables from `.env.example` if needed
   - Add them in Vercel dashboard under Settings > Environment Variables

3. **Custom Domain:**
   - In Vercel dashboard, go to Settings > Domains
   - Add domain: `www.rajdeepmondal.com`
   - Follow DNS configuration instructions

4. **Deploy:**
   - Vercel will automatically deploy on every push to main branch
   - Build Command: `yarn build` (pre-configured in `vercel.json`)
   - Output Directory: `.next` (pre-configured)

## Post-Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel project connected
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Site loads properly at www.rajdeepmondal.com
- [ ] All navigation links work
- [ ] Blog posts display correctly
- [ ] Projects page accessible
- [ ] About page loads
- [ ] Contact information correct

## Automatic Deployments

Every push to the `main` branch will trigger an automatic deployment to Vercel. Preview deployments are created for pull requests.

## Analytics & Performance

Consider enabling:
- Google Analytics (add `NEXT_PUBLIC_GOOGLE_ANALYTICS` to environment variables)
- Vercel Analytics (built-in, enable in dashboard)
- Core Web Vitals monitoring 