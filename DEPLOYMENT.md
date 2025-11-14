# GitHub Pages Deployment Setup

## Automatic Setup ✅

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### What's Already Configured:

1. ✅ Vite config with correct base path (`/Friendship_Tiers/`)
2. ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
3. ✅ Build optimization for production
4. ✅ `.nojekyll` file to bypass Jekyll processing

### One-Time GitHub Repository Setup:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. That's it! The workflow will automatically deploy on every push to `main`

### Manual Deployment (if needed):

```bash
# Build the project
npm run build

# The dist folder will be created with optimized production files
```

### Live URL:

Once deployed, your site will be available at:
**https://shailavmalik.github.io/Friendship_Tiers/**

### Troubleshooting:

If you see a blank page:
- ✅ Make sure GitHub Pages is set to use **GitHub Actions** (not Deploy from branch)
- ✅ Check the Actions tab for any build errors
- ✅ Verify the base path in `vite.config.js` matches your repository name
- ✅ Clear browser cache and hard reload (Ctrl+Shift+R)

### Local Testing of Production Build:

```bash
npm run build
npm run preview
```

This will build and preview the production version locally at `http://localhost:4173`
