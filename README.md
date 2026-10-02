# MONTY GENIUS ECOM TOOLS

> **Free Tools for Smart Online Sellers**  
> *Designed with ❤️ by Mr. Monty Genius*

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-cyan.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue.svg)
![Vite](https://img.shields.io/badge/Vite-8-purple.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-teal.svg)
![Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Privacy](https://img.shields.io/badge/privacy-100%25%20In--Browser-success.svg)

---

## 🌟 Executive Overview

**MONTY GENIUS ECOM TOOLS** is a comprehensive, production-ready, open-source web application suite and Chrome extension built specifically for online sellers (Amazon, Flipkart, Meesho, Shopify, Etsy, and independent D2C merchants).

Built with an unwavering **zero-upload, privacy-first architecture**, all sensitive calculations, PDF label operations, image cropping, and spreadsheet cleanups execute **locally inside your browser**. Your private product costs, margins, and customer data never leave your device.

---

## 🚀 Key Features & Highlights

- ⚡ **40+ Dedicated Tools:** Seller calculators, PDF utilities, image editors, barcode/QR generators, invoice makers, and CSV cleaners.
- 🔒 **100% Client-Side Privacy:** Zero server file uploads. Your business secrets stay on your machine.
- 🧩 **MONTY GENIUS SELLER ASSISTANT:** Manifest V3 Chrome Extension with configurable CSS selector form autofill.
- 🧪 **Self-Test Mode (`/dev/test-suite`):** Built-in deterministic formula verifier ensuring mathematical accuracy.
- 📱 **Installable PWA:** Works offline with service workers and local caching.
- 🎨 **Modern SaaS Interface:** Premium cyan/blue accents, glassmorphic cards, seamless dark/light mode toggle.
- 🔍 **Instant Fuzzy Search (Ctrl+K):** Real-time tool discovery by name, keyword, or operational need.
- 💰 **Zero Paid Dependencies:** No paid APIs, no recurring software subscriptions, no database charges.

---

## 🛠️ Complete Suite of Implemented Tools

### 📊 1. Seller Calculators
1. **Profit Calculator** (`/tools/profit-calculator`): Net profit, expenses, margins, break-even selling price with visual charts.
2. **Product Pricing Calculator** (`/tools/product-pricing-calculator`): Minimum and target selling prices based on margin goals.
3. **GST Calculator** (`/tools/gst-calculator`): Inclusive and exclusive GST calculations across 5%, 12%, 18%, and 28% slabs.
4. **Margin Calculator** (`/tools/margin-calculator`): Gross profit margins, markups, and cost-to-revenue ratios.
5. **RTO Profit Calculator** (`/tools/rto-calculator`): Return-to-origin loss rates, shipping waste, and adjusted profits.
6. **Return Loss Calculator** (`/tools/return-loss-calculator`): Customer and courier return damage losses.
7. **Marketplace Fee Calculator** (`/tools/marketplace-fee-calculator`): Configurable Amazon, Flipkart, and Meesho fee estimates.
8. **Break-Even Calculator** (`/tools/break-even-calculator`): Units and revenue needed to cover fixed overheads.
9. **Discount Calculator** (`/tools/discount-calculator`): Promotional sale prices, percentage discounts, and customer savings.
10. **Bulk Pricing Calculator** (`/tools/bulk-pricing-calculator`): Spreadsheet profit analysis processed locally in-browser.

### 📄 2. PDF Tools (100% In-Browser)
11. **PDF Cropper** (`/tools/pdf-cropper`): Crop margins on shipping labels and dispatch slips for thermal printers.
12. **PDF Merger** (`/tools/pdf-merger`): Combine multiple PDF documents into a single unified file.
13. **PDF Splitter** (`/tools/pdf-splitter`): Separate large PDF files into distinct single pages or ranges.
14. **PDF Page Extractor** (`/tools/pdf-page-extractor`): Extract specific pages from multi-page PDFs.
15. **PDF Layout (N-up Tool)** (`/tools/pdf-layout-tool`): Multi-page layouts (2-up, 4-up, 6-up, 8-up) onto A4/A5 sheets.
16. **PDF Compressor** (`/tools/pdf-compressor`): Client-side PDF file size reduction.
17. **PDF Rotator** (`/tools/pdf-rotator`): Correct page orientations by 90°, 180°, or 270°.
18. **PDF Page Reorder** (`/tools/pdf-page-reorder`): Re-sequence document pages before exporting.
19. **PDF to Image** (`/tools/pdf-to-image`): Convert PDF document pages into high-res PNG/JPG images.
20. **Image to PDF** (`/tools/image-to-pdf`): Compile product photos into a unified PDF document.

### 🖼️ 3. Image Tools
21. **Image Compressor** (`/tools/image-compressor`): Compress JPG, PNG, and WebP with quality sliders and ZIP download.
22. **Image Resizer** (`/tools/image-resizer`): Resize single or batch photos with aspect ratio locks.
23. **JPG to PNG** (`/tools/jpg-to-png`): In-browser conversion to lossless PNG format.
24. **PNG to JPG** (`/tools/png-to-jpg`): Convert PNG files to lightweight JPG with background color fills.
25. **WebP Converter** (`/tools/webp-converter`): Convert images to modern lightweight WebP format.
26. **Image Cropper** (`/tools/image-cropper`): Crop product images to marketplace aspect ratios.
27. **Image Background Utility** (`/tools/image-background`): Add solid, white, or padded backgrounds to product cutouts.
28. **Product Image Formatter** (`/tools/product-image-formatter`): Format images to standard 1000x1000 marketplace guidelines.
29. **Batch Resizer** (`/tools/product-image-batch-resizer`): Bulk resize dozens of product images and export as a ZIP.

### 🏷️ 4. Seller Utilities
30. **SKU Generator** (`/tools/sku-generator`): Create systematic inventory SKUs with prefixes, categories, and sequences.
31. **QR Code Generator** (`/tools/qr-code-generator`): Generate UPI payments, WhatsApp, URLs, and Wi-Fi QR codes in PNG and SVG.
32. **Barcode Generator** (`/tools/barcode-generator`): Standard Code 128, EAN-13, EAN-8, and UPC-A with SVG/PNG download.
33. **Product Label Generator** (`/tools/product-label-generator`): Design printable thermal 4x6 labels with barcodes and QR codes.
34. **Shipping Label Formatter** (`/tools/shipping-label-formatter`): Format and align customer package shipping slips.
35. **GST Invoice Generator** (`/tools/invoice-generator`): Commercial invoice drafting with PDF export and local templates.
36. **Product Title Generator** (`/tools/product-title-generator`): SEO listing titles built on marketplace algorithm formulas.
37. **Product Description Generator** (`/tools/product-description-generator`): Compelling, benefit-driven product copywriting.
38. **Product Keyword Generator** (`/tools/product-keyword-generator`): Backend search terms and high-volume discovery tags.
39. **HSN Code Helper** (`/tools/hsn-helper`): Search common HSN codes and statutory GST tax rates.
40. **CSV Formatter** (`/tools/csv-formatter`): Interactive spreadsheet table viewer with column reordering.
41. **CSV Cleaner** (`/tools/csv-cleaner`): Remove blank lines, trim extra spaces, and eliminate duplicate rows.
42. **Bulk Product Data Formatter** (`/tools/bulk-product-data-formatter`): Standardize bulk product catalog titles and prices.
43. **AI Product Content Optimizer** (`/tools/ai-product-tools`): Multi-provider AI assistant (OpenAI, Gemini, OpenRouter, Ollama, and offline smart engine).

---

## 💻 Quick Start & Commands

### 1. Prerequisites
- Node.js v18+ (tested on Node v22)
- npm v9+

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/monty-genius-ecom-tools.git
cd "monty-genius-ecom-tools"

# Install frontend dependencies
npm install --prefix frontend
```

### 3. Run Development Server
```bash
npm run dev
# Starts local Vite development server at http://localhost:5173
```

### 4. Run Automated Test Suite
```bash
npm test
# Executes deterministic unit tests across all formulas and logic
```

### 5. Build for Production
```bash
npm run build
# Compiles optimized production bundle in frontend/dist/
```

### 6. Preview Production Build
```bash
npm run preview
# Serves the compiled production build locally
```

---

## 🧩 Chrome Extension Setup

The **MONTY GENIUS SELLER ASSISTANT** Chrome Extension (Manifest V3) is ready in the `extension/` folder:

1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Toggle **Developer mode** on in the upper-right corner.
3. Click **Load unpacked** and select the `extension` folder:
   ```
   m:\MONTY GENIUS ECOM TOOLS\extension
   ```
4. Pin the extension to your browser toolbar.
5. Use it to store product catalogs and 1-click autofill seller listing forms safely!

---

## 🧪 Self-Test Verification Mode

Navigate to `/dev/test-suite` in the web application (or run `npm test` in the terminal) to execute automated deterministic test verifications:
- Profit, Margin & Break-even calculations
- Inclusive & Exclusive GST extractions
- Discount math & RTO loss metrics
- Barcode validation (EAN-13, EAN-8, UPC-A, Code 128)
- QR code UPI & Wi-Fi payload formats
- CSV deduplication & whitespace cleaning
- LocalStorage persistence read/write checks

---

## 🚢 Deployment

Detailed deployment guides are available in `docs/DEPLOYMENT.md`:
- **Vercel:** Zero-config static deployment targeting `frontend/` root.
- **Cloudflare Pages:** Global edge CDN deployment with `frontend/dist`.
- **GitHub Pages:** Automated deployment via GitHub Actions workflow.

---

## 📚 Documentation Index

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — Technical system design and technology choices
- [TOOLS.md](docs/TOOLS.md) — Exhaustive tool specifications and formulas
- [EXTENSION.md](docs/EXTENSION.md) — Chrome extension architecture and selector mapping guide
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) — Production deployment instructions
- [PRIVACY.md](docs/PRIVACY.md) — In-browser local processing and privacy guarantees
- [SECURITY.md](docs/SECURITY.md) — Security policies and input sanitization standards

---

## ⚠️ Marketplace Disclaimer

Marketplace fees, shipping charges, taxes, policies and seller requirements can change. Calculator values are configurable estimates and should be verified against the applicable marketplace's current official documentation. Monty Genius Ecom Tools is an independent open-source utility and is not affiliated with Amazon, Flipkart, Meesho, Ecomdost, or any other commercial marketplace.

---

## 📄 License & Credits

Designed with ❤️ by **Mr. Monty Genius**.  
Released under the permissive MIT Open Source License.
