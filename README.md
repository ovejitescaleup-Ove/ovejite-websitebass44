# Website Configuration

This site is now powered by a simple GitHub-based CMS instead of Base44.

## Site Settings

All site configuration is stored in `public/site-settings.json`. To update your site:

1. Edit `public/site-settings.json` with your information
2. Commit and push to GitHub
3. Your site will automatically reload with the new settings

## Environment Variables

No Base44 credentials needed. You can remove the `.env.local` file or keep it empty.

## Running Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see your site.

## Deployment

Deploy to Vercel, Netlify, or any static host:

```bash
npm run build
# Deploy the dist/ folder
```

## Features

- ✅ Pure React + Vite
- ✅ No backend required
- ✅ GitHub-based CMS (edit JSON, commit, deploy)
- ✅ Fast, lightweight, static
- ✅ Analytics ready (GTM, GA4, Meta Pixel)
