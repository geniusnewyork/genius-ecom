# DEPLOYMENT GUIDE

# MONTY GENIUS ECOM TOOLS
> Free Tools for Smart Online Sellers  
> Designed with ❤️ by Mr. Monty Genius

---

## 1. Local Development & Preview Commands

The project supports zero-configuration local execution from either the root repository directory or the `frontend/` directory.

### Quick Start (from Root):
```bash
# 1. Install dependencies
npm install --prefix frontend

# 2. Run automated test suites
npm test

# 3. Start local development server with Hot Module Reload
npm run dev

# 4. Build optimized production bundle
npm run build

# 5. Preview production build locally
npm run preview
```

### Direct Frontend Directory Commands:
```bash
cd frontend
npm install
npm run dev       # Starts Vite dev server (usually http://localhost:5173)
npm run build     # Outputs production assets to frontend/dist/
npm run preview   # Serves the dist folder locally
```

---

## 2. Deploying to Vercel (Recommended)

Vercel provides instant zero-config static hosting for Vite applications.

### Method A: Vercel CLI
```bash
cd frontend
npm install -g vercel
vercel
```

### Method B: Vercel Web Dashboard (GitHub Integration)
1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and import the repository.
3. Configure settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

---

## 3. Deploying to Cloudflare Pages

Cloudflare Pages offers fast worldwide CDN caching, zero egress fees, and custom domain SSL.

### Web Dashboard Configuration:
1. Connect your GitHub repository to Cloudflare Pages.
2. Select **Create a project** -> **Pages**.
3. Set build configuration:
   - **Framework preset:** `Vite`
   - **Root directory:** `frontend`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy!

### Single Page Application (SPA) Routing on Cloudflare Pages:
To ensure React Router URLs (like `/tools/profit-calculator` or `/category/calculators`) work without 404 errors upon direct reload:
Add a `frontend/public/_redirects` file with the rule:
```
/*    /index.html   200
```
*(This is already included in `frontend/public/`)*

---

## 4. Deploying to GitHub Pages

GitHub Pages allows completely free static hosting directly from your repository branch.

### Using GitHub Actions:
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: |
          cd frontend
          npm ci

      - name: Build
        run: |
          cd frontend
          npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'frontend/dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 5. Chrome Extension Deployment

To publish the **MONTY GENIUS SELLER ASSISTANT** on the Chrome Web Store:
1. Navigate to the `extension/` folder.
2. Create a `.zip` archive containing all files in `extension/` (`manifest.json`, `background.js`, `content.js`, `popup.*`, `options.*`, `icons/`).
3. Open the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
4. Click **New Item**, upload the zip file, fill in the store descriptions, and submit for review.
