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

**MONTY GENIUS ECOM TOOLS** is a comprehensive, production-ready commercial software platform and open-source seller toolkit built specifically for online sellers (Amazon, Flipkart, Meesho, Shopify, Etsy, and independent D2C merchants).

The platform features an architectural dual-mode design:
1. **Free Personal Toolset Mode:** Works immediately for the owner and public users with 40+ browser-side tools and zero subscription fees.
2. **Commercial Edition Mode:** Built-in License API, multi-device activation system, configurable plans (FREE, PRO, BUSINESS, LIFETIME), feature flag entitlement engine, role-based Admin Dashboard, and modular Manifest V3 Chrome Extension.

Built with an unwavering **zero-upload, privacy-first architecture**, all sensitive calculations, PDF label operations, image cropping, and spreadsheet cleanups execute **locally inside your browser**. Your private product costs, margins, and customer data never leave your device.

---

## 🏗️ Monorepo Architecture

```text
monty-genius-ecom-tools/
├── apps/
│   ├── web/               # React 19 + TypeScript + Vite + Tailwind CSS v4 (Public Web App)
│   ├── extension/         # Manifest V3 Chrome Extension (Modular Autofill Engine)
│   └── admin/             # React 19 + Vite + TypeScript (Role-based Admin Dashboard)
├── services/
│   └── license-api/       # REST API (/api/v1/), SQLite/Postgres DB, HMAC Tokens, Rate Limiting
├── packages/
│   ├── shared-types/      # TypeScript definitions (License, Device, Plan, User, AuditLog)
│   ├── ui/                # Shared UI tokens and components
│   ├── calculator-engine/ # Pure calculation engine functions
│   ├── validation/        # Cryptographic key & payload validation
│   └── config/            # Central plans, feature flags, and brand constants
├── docs/                  # Exhaustive documentation (Architecture, API, Extension, Security)
├── tests/                 # Automated test suites (Calculators, Utilities, Commercial Licensing)
└── scripts/               # Chrome Web Store packaging and deployment scripts
```

---

## 🚀 Key Features & Highlights

- ⚡ **43+ Dedicated Tools:** Seller calculators, PDF utilities, image editors, barcode/QR generators, invoice makers, CSV cleaners, and AI content assistant.
- 🔒 **100% Client-Side Privacy:** Zero server file uploads for documents, spreadsheets, and product photography.
- 🧩 **MONTY GENIUS SELLER ASSISTANT:** Manifest V3 Chrome Extension with generic marketplace adapters (Amazon, Flipkart, Meesho, Shopify) and configurable CSS selectors.
- 🔑 **Commercial Licensing & Device System:** Cryptographically secure keys (`MGPRO-XXXX`), SHA-256 hashing, HMAC-SHA256 offline tokens, and strict per-plan device limits.
- 🛡️ **Role-Based Admin Dashboard:** Real-time statistics, license creation, suspension, extension, device seat resets, and immutable security audit logs.
- 🧪 **Deterministic Test Suite:** Complete unit, integration, and security tests runnable via `npm test`.
- 🎨 **Modern SaaS Interface:** Premium cyan/blue accents, glassmorphic cards, seamless dark/light mode toggle.
- 🔍 **Instant Fuzzy Search (Ctrl+K):** Real-time tool discovery by name, keyword, or operational need.
- 💰 **Zero Paid Dependencies:** No paid APIs, no recurring software subscriptions, no database charges required.

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

### 🏷️ 4. Seller Utilities & AI
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
- Node.js v18+ (tested on Node v22.23.2)
- npm v9+

### 2. Available Workspace Commands
```bash
# Start Web Application (http://localhost:5173)
npm run dev
# or: npm run dev:web

# Start Admin Dashboard (http://localhost:5174)
npm run dev:admin

# Start License API Server (http://localhost:4000)
npm run dev:api

# Run All Automated Test Suites (Unit + Security + API)
npm test

# Build All Apps for Production
npm run build

# Package Chrome Extension for Chrome Web Store (dist/monty-genius-seller-assistant-v1.0.0.zip)
npm run package:extension
```

---

## 🧩 Chrome Extension Setup

The **MONTY GENIUS SELLER ASSISTANT** Chrome Extension (Manifest V3) is ready in the `apps/extension/` folder:

1. Open Google Chrome (or Edge/Brave) and navigate to `chrome://extensions/`.
2. Toggle **Developer mode** on in the upper-right corner.
3. Click **Load unpacked** and select the extension folder:
   ```
   m:\MONTY GENIUS ECOM TOOLS\apps\extension
   ```
4. Pin the extension to your browser toolbar.
5. Use it to store product catalogs and 1-click autofill seller listing forms safely!

---

## 📚 Complete Documentation Index

All technical documents are stored in the `docs/` directory:
- [USER_MANUAL.md](docs/USER_MANUAL.md) — Comprehensive user manual for every tool and extension workflow
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — Technical system design, monorepo structure, and technology choices
- [LICENSE-SYSTEM.md](docs/LICENSE-SYSTEM.md) — Cryptographic license architecture, device limits, and offline grace tokens
- [ADMIN.md](docs/ADMIN.md) — Admin dashboard architecture, authentication, and license lifecycle management
- [EXTENSION.md](docs/EXTENSION.md) — Chrome extension architecture, adapter patterns, and selector mapping guide
- [SECURITY.md](docs/SECURITY.md) — Security policies, threat model, input sanitization, and permission audit
- [DATABASE.md](docs/DATABASE.md) — Database schema, abstraction layer, migrations, and seed scripts
- [PAYMENTS.md](docs/PAYMENTS.md) — PaymentProvider abstraction, webhook security, and automatic fulfillment flow
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) — Commercial deployment guide (Vercel, Cloudflare, Node/Docker)
- [PRIVACY.md](docs/PRIVACY.md) — In-browser local processing and privacy guarantees
- [TOOLS.md](docs/TOOLS.md) — Exhaustive tool specifications, mathematical formulas, and capabilities

---

## ⚠️ Marketplace Disclaimer

Marketplace fees, shipping charges, taxes, policies and seller requirements can change. Calculator values are configurable estimates and should be verified against the applicable marketplace's current official documentation. Monty Genius Ecom Tools is an independent open-source utility and is not affiliated with Amazon, Flipkart, Meesho, Ecomdost, or any other commercial marketplace.

---

## 📄 License & Credits

Designed with ❤️ by **Mr. Monty Genius**.  
Released under the permissive MIT Open Source License.
