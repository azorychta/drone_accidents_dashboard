# Deployment Guide

## 🚀 Quick Start (2 Minutes)

**Fastest way to deploy:**

```bash
# 1. Login to Vercel (first time only)
vercel login

# 2. Deploy (accept all defaults)
vercel --yes
```

That's it! Your site will be live at `https://your-project.vercel.app` in ~2 minutes.

---

## Quick Deploy to Vercel (Recommended - 100% Free)

### Option 1: GitHub Integration (Easiest)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login (free with GitHub)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. Your site will be deployed instantly.

## Free Tier Limits (Vercel)

- ✅ **100GB bandwidth/month** - Enough for ~1M page views
- ✅ **Unlimited requests** - Serverless functions
- ✅ **Automatic HTTPS** - SSL certificates
- ✅ **Global CDN** - Fast worldwide
- ✅ **Custom domains** - Free subdomain + custom domains
- ✅ **Preview deployments** - For every Git branch/PR

## When You Need More

### Upgrade Options:

1. **Vercel Pro** ($20/month):
   - 1TB bandwidth
   - Team collaboration
   - Advanced analytics

2. **Database** (when needed):
   - **Supabase**: Free tier (500MB, 2GB bandwidth)
   - **PlanetScale**: Free tier (5GB, 1B reads/month)
   - **Upstash Redis**: Free tier (10K commands/day)

3. **CDN/Caching**:
   - Vercel Edge Network (included)
   - Cloudflare (free tier available)

## Performance Tips

1. **Use Static Generation**: Already configured ✅
2. **Enable Caching**: Vercel does this automatically ✅
3. **Optimize Images**: Use Next.js Image component if adding images
4. **Database Caching**: Add Redis when scaling (Upstash free tier)

## Monitoring

- **Vercel Analytics**: Built-in (free tier)
- **Sentry**: Error tracking (free tier available)
- **Google Analytics**: Free (add if needed)

## Cost Breakdown

### Current Setup (100% Free):
- Hosting: Vercel (Free)
- Maps: OpenStreetMap (Free)
- Charts: Recharts (Free, client-side)
- Total: **$0/month**

### With Database (Still Free):
- Hosting: Vercel (Free)
- Database: Supabase/PlanetScale (Free tier)
- Maps: OpenStreetMap (Free)
- Total: **$0/month** (until you exceed free tiers)

### Scaling Costs:
- 1M+ page views/month: Vercel Pro ($20/month)
- Large database: ~$10-25/month
- **Total: ~$30-45/month** for significant scale

