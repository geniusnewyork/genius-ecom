# MONTY GENIUS ECOM TOOLS — COMPLETE STEP-BY-STEP USER MANUAL

> **Brand:** MONTY GENIUS  
> **Product:** MONTY GENIUS ECOM TOOLS  
> **Tagline:** Free Tools for Smart Online Sellers  
> **Footer:** Designed with ❤️ by Mr. Monty Genius  
> **Privacy Guarantee:** 100% Client-Side In-Browser Processing — Zero Server File Uploads

---

## TABLE OF CONTENTS

1. [Quick Start & Launching the Suite](#1-quick-start--launching-the-suite)
2. [Global Navigation & Workspace Features](#2-global-navigation--workspace-features)
3. [Seller Calculators (10 Tools)](#3-seller-calculators)
   - 3.1 [Profit Calculator](#31-profit-calculator)
   - 3.2 [Product Pricing Calculator](#32-product-pricing-calculator)
   - 3.3 [GST Calculator](#33-gst-calculator)
   - 3.4 [Margin Calculator](#34-margin-calculator)
   - 3.5 [RTO Profit Calculator](#35-rto-profit-calculator)
   - 3.6 [Return Loss Calculator](#36-return-loss-calculator)
   - 3.7 [Marketplace Fee Calculator](#37-marketplace-fee-calculator)
   - 3.8 [Break-Even Calculator](#38-break-even-calculator)
   - 3.9 [Discount Calculator](#39-discount-calculator)
   - 3.10 [Bulk Pricing Calculator](#310-bulk-pricing-calculator)
4. [PDF Tools (10 Tools)](#4-pdf-tools)
   - 4.1 [PDF Cropper](#41-pdf-cropper)
   - 4.2 [PDF Merger](#42-pdf-merger)
   - 4.3 [PDF Splitter](#43-pdf-splitter)
   - 4.4 [PDF Page Extractor](#44-pdf-page-extractor)
   - 4.5 [PDF Layout (N-up Tool)](#45-pdf-layout-n-up-tool)
   - 4.6 [PDF Compressor](#46-pdf-compressor)
   - 4.7 [PDF Rotator](#47-pdf-rotator)
   - 4.8 [PDF Page Reorder](#48-pdf-page-reorder)
   - 4.9 [PDF to Image](#49-pdf-to-image)
   - 4.10 [Image to PDF](#410-image-to-pdf)
5. [Image Tools (9 Tools)](#5-image-tools)
   - 5.1 [Image Compressor](#51-image-compressor)
   - 5.2 [Image Resizer](#52-image-resizer)
   - 5.3 [JPG to PNG Converter](#53-jpg-to-png-converter)
   - 5.4 [PNG to JPG Converter](#54-png-to-jpg-converter)
   - 5.5 [WebP Converter](#55-webp-converter)
   - 5.6 [Image Cropper](#56-image-cropper)
   - 5.7 [Image Background Utility](#57-image-background-utility)
   - 5.8 [Product Image Formatter](#58-product-image-formatter)
   - 5.9 [Batch Product Resizer](#59-batch-product-resizer)
6. [Seller Utilities (13 Tools)](#6-seller-utilities)
   - 6.1 [SKU Generator](#61-sku-generator)
   - 6.2 [QR Code Generator](#62-qr-code-generator)
   - 6.3 [Barcode Generator](#63-barcode-generator)
   - 6.4 [Product Label Generator](#64-product-label-generator)
   - 6.5 [Shipping Label Formatter](#65-shipping-label-formatter)
   - 6.6 [GST Invoice Generator](#66-gst-invoice-generator)
   - 6.7 [Product Title Generator](#67-product-title-generator)
   - 6.8 [Product Description Generator](#68-product-description-generator)
   - 6.9 [Product Keyword Generator](#69-product-keyword-generator)
   - 6.10 [HSN Code & GST Helper](#610-hsn-code--gst-helper)
   - 6.11 [CSV Formatter](#611-csv-formatter)
   - 6.12 [CSV Cleaner & Deduplicator](#612-csv-cleaner--deduplicator)
   - 6.13 [Bulk Product Data Formatter](#613-bulk-product-data-formatter)
7. [AI Product Content Optimizer](#7-ai-product-content-optimizer)
8. [Chrome Extension Setup & 1-Click Form Autofill](#8-chrome-extension-setup--1-click-form-autofill)
9. [Built-In Test Suite & Privacy Controls](#9-built-in-test-suite--privacy-controls)
10. [End-to-End Real-World Seller Playbooks](#10-end-to-end-real-world-seller-playbooks)

---

## 1. QUICK START & LAUNCHING THE SUITE

### Prerequisites
- Node.js installed (v18 or higher recommended).
- Any modern web browser (Google Chrome, Microsoft Edge, Brave, Firefox, or Safari).

### Launching in Development Mode
Open your PowerShell or Terminal in the root folder `m:\MONTY GENIUS ECOM TOOLS`:
```powershell
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### Launching in Production Mode
```powershell
npm run build
npm run preview
```
Open the provided local preview URL (typically `http://localhost:4173`).

---

## 2. GLOBAL NAVIGATION & WORKSPACE FEATURES

### Instant Global Search
1. In the top navigation header, locate the search bar (`Search tools...` or press `Ctrl + K` / `Cmd + K`).
2. Type any keyword (e.g. `profit`, `label`, `crop`, `gst`, `sku`).
3. Matching tools appear instantly in a quick dropdown list. Click any tool to open it directly.

### Dark & Light Mode Toggle
- Click the Sun/Moon toggle icon in the top-right corner of the header.
- Your theme preference is saved to your browser's local storage and remembered across sessions.

### Category Filters
On the Home Page or `/tools` page, click on any category chip:
- **All Tools** (43 tools)
- **Calculators** (10 tools)
- **PDF Tools** (10 tools)
- **Image Tools** (9 tools)
- **Seller Tools** (10 tools)
- **CSV Tools** (3 tools)
- **AI Tools** (1 tool)

---

## 3. SELLER CALCULATORS

### 3.1 Profit Calculator
**URL:** `/tools/profit-calculator`  
**Purpose:** Calculates the exact net profit, profit margin, GST amount, and break-even selling price for a product.

#### Step-by-Step Instructions:
1. **Fill in Product Costs:**
   - **Product Cost (₹):** What you paid the manufacturer/wholesaler (e.g., `350`).
   - **Packaging Cost (₹):** Polybags, boxes, bubble wrap, tape (e.g., `20`).
   - **Shipping Cost (₹):** Forward courier fee (e.g., `70`).
2. **Fill in Platform & Statutory Fees:**
   - **Marketplace Commission (%):** Platform fee percentage (e.g., `12`).
   - **GST (%):** Applicable GST slab (e.g., `18`).
   - **Advertising / PPC (₹):** Expected cost-per-sale advertising budget (e.g., `50`).
   - **Return / RTO Provision (₹):** Expected buffer for courier returns (e.g., `30`).
   - **Other Costs (₹):** Overhead or storage fees (e.g., `10`).
3. **Fill in Pricing:**
   - **Selling Price (₹):** Your listing price (e.g., `999`).
   - **Discount (%):** Optional coupon discount (e.g., `0`).
4. **Read Live Metric Cards:**
   - **Gross Revenue:** Total sale value after discount.
   - **Total Expenses:** Sum of product, shipping, commission, ads, GST, and buffers.
   - **Net Profit:** Money that stays in your bank account after all deductions.
   - **Profit Margin (%):** Net profit divided by gross revenue.
   - **Break-Even Price:** The absolute minimum selling price to avoid a loss.
5. **Action Buttons:**
   - **Copy Result:** Copies a formatted breakdown text to your clipboard.
   - **Download TXT:** Saves the breakdown as a text file.
   - **Print:** Opens a print-optimized clean report.
   - **Reset:** Resets all inputs back to default values.

---

### 3.2 Product Pricing Calculator
**URL:** `/tools/product-pricing-calculator`  
**Purpose:** Solves backwards to tell you what selling price you *must* charge to achieve your target profit margin.

#### Step-by-Step Instructions:
1. **Enter Your Direct Costs:**
   - Product Cost, Packaging Cost, Forward Shipping Cost.
2. **Enter Marketplace Rules:**
   - Marketplace Commission %, Fixed Closing Fee (₹), Statutory GST Rate (%).
   - Advertising Cost per order (₹), Expected Return / RTO loss percentage buffer.
3. **Set Your Target:**
   - **Expected Profit %:** Enter the percentage margin you demand (e.g., `25%`).
4. **Examine Outputs:**
   - **Recommended Selling Price:** The listing price to set on Amazon/Flipkart/Meesho.
   - **Minimum Selling Price:** The absolute rock-bottom price where profit equals zero.
   - **Expected Net Profit (₹):** Absolute cash profit per unit sold.
   - **Break-Even Price:** Price where total revenues equal total expenditures.

---

### 3.3 GST Calculator
**URL:** `/tools/gst-calculator`  
**Purpose:** Quickly calculates inclusive (tax extraction) or exclusive (tax addition) GST splits.

#### Step-by-Step Instructions:
1. **Select Mode:**
   - **Inclusive GST:** When the price already includes GST (e.g. Retail MRP).
   - **Exclusive GST:** When GST needs to be added on top (e.g. B2B Wholesale invoice).
2. **Enter Amount (₹):** Input your transaction value (e.g., `1000`).
3. **Select GST Slab:**
   - Click one of the quick presets: `5%`, `12%`, `18%`, `28%`, or select `Custom %`.
4. **Outputs Displayed:**
   - **Base Amount:** Price before GST.
   - **Total GST Amount:** Total tax component.
   - **CGST (Central GST):** Exactly 50% of the total GST.
   - **SGST (State GST):** Exactly 50% of the total GST (or IGST for interstate).
   - **Final Total Amount:** Base + GST.

---

### 3.4 Margin Calculator
**URL:** `/tools/margin-calculator`  
**Purpose:** Calculates Gross Margin vs. Markup Percentage to avoid common seller pricing confusion.

#### Step-by-Step Instructions:
1. Enter **Cost Price (CP)** (e.g., `400`).
2. Enter **Selling Price (SP)** (e.g., `600`).
3. **Outputs:**
   - **Gross Profit:** `SP - CP` (e.g., ₹200).
   - **Profit Margin:** `(Gross Profit / SP) × 100` (e.g., `33.33%`).
   - **Markup:** `(Gross Profit / CP) × 100` (e.g., `50.00%`).

---

### 3.5 RTO Profit Calculator
**URL:** `/tools/rto-calculator`  
**Purpose:** Measures how Return-To-Origin (undelivered COD orders) eats into your net profit.

#### Step-by-Step Instructions:
1. **Enter Order Statistics:**
   - Total Dispatched Orders (e.g., `100`).
   - Delivered Orders (e.g., `80`).
   - RTO Orders (e.g., `20`).
2. **Enter Cost Parameters:**
   - Product Cost, Selling Price, Forward Shipping Fee, Reverse Courier Fee, Packaging Waste per RTO.
3. **Review Outputs:**
   - **RTO Rate (%):** Percentage of orders that failed delivery.
   - **Loss per RTO:** Forward courier + Reverse courier + Packaging materials wasted.
   - **Total RTO Loss:** Cumulative loss absorbed by the business.
   - **Adjusted Net Profit per Delivered Order:** The true profit left over per successfully delivered customer order.

---

### 3.6 Return Loss Calculator
**URL:** `/tools/return-loss-calculator`  
**Purpose:** Computes the heavy financial loss from customer returns, buyer fraud, and damaged in-transit goods.

#### Step-by-Step Instructions:
1. Enter Monthly Order Volume (e.g., `500`).
2. Enter Expected Customer Return Rate % (e.g., `15%`).
3. Enter Reverse Courier Fee charged by marketplace per return (e.g., `120`).
4. Enter Packaging Waste per return (e.g., `25`).
5. Enter Percentage of returned products that come back unsellable/damaged (e.g., `10%`).
6. **Outputs:** Total units returned, direct reverse logistics loss, dead inventory write-off, and total bottom-line monthly loss.

---

### 3.7 Marketplace Fee Calculator
**URL:** `/tools/marketplace-fee-calculator`  
**Purpose:** Estimates platform deductions and net seller payout across customizable marketplace fee structures.

#### Step-by-Step Instructions:
1. **Select Marketplace Preset:**
   - Choose **Meesho**, **Amazon**, **Flipkart**, or **Custom**.
   - Note: Fees are clearly user-configurable so you can match your specific sub-category commission.
2. **Adjust Values:**
   - Commission %, Fixed Closing Fee (₹), Shipping Fee (₹), GST on fees (18%), Other deductions.
3. Enter your **Selling Price (₹)**.
4. **Outputs:**
   - Commission Deduction (₹).
   - Platform Fees (₹).
   - GST on Marketplace Services (₹).
   - Total Deductions (₹).
   - **Estimated Seller Bank Payout (₹)**.

---

### 3.8 Break-Even Calculator
**URL:** `/tools/break-even-calculator`  
**Purpose:** Finds how many units you need to sell to pay off your monthly fixed warehouse, software, and staff overheads.

#### Step-by-Step Instructions:
1. Enter **Monthly Fixed Costs (₹):** Warehouse rent, staff salaries, internet, utility bills (e.g., `50,000`).
2. Enter **Unit Selling Price (₹):** (e.g., `800`).
3. Enter **Unit Variable Cost (₹):** Product cost + packaging + shipping + commission per unit (e.g., `550`).
4. **Outputs:**
   - **Contribution Margin per Unit:** `Selling Price - Variable Cost` (e.g., ₹250).
   - **Contribution Margin Ratio (%):** Percentage of revenue available to cover fixed costs.
   - **Break-Even Units:** Exactly how many units you must ship to reach zero loss.
   - **Break-Even Revenue:** Total sales turnover required to break even.

---

### 3.9 Discount Calculator
**URL:** `/tools/discount-calculator`  
**Purpose:** Calculates customer promotions, festival flash sale prices, and buyer savings.

#### Step-by-Step Instructions:
1. Enter Original Product Price (e.g., `1299`).
2. Enter Discount Percentage (e.g., `35%`) or flat amount off.
3. **Outputs:**
   - Final Sale Price for customer.
   - Total Cash Savings.
   - Effective Discount percentage.

---

### 3.10 Bulk Pricing Calculator
**URL:** `/tools/bulk-pricing-calculator`  
**Purpose:** Computes profit margins for hundreds or thousands of products simultaneously from a CSV file.

#### Step-by-Step Instructions:
1. Prepare a CSV file with columns: `sku`, `name`, `cost`, `shipping`, `sp`, `commission`, `gst`.
2. Click **Download Sample CSV** inside the tool if you need a template.
3. Click **Upload CSV** or drag-and-drop your spreadsheet.
4. The tool processes every row in browser memory in milliseconds!
5. Inspect the interactive table showing: SKU, Name, Cost, SP, Net Profit, and Profit Margin %.
6. Click **Download Computed CSV** to export your calculated catalog with full profit metrics.

---

## 4. PDF TOOLS (100% Client-Side In-Browser)

*All PDF processing is executed using native client-side libraries (`pdf-lib`, `pdfjs-dist`). Your confidential invoices and shipping labels never touch an external server.*

### 4.1 PDF Cropper
**URL:** `/tools/pdf-cropper`  
**Purpose:** Crops unwanted margins, white borders, and summary footers from marketplace shipping labels to optimize them for 4x6 thermal printers.

#### Step-by-Step Instructions:
1. Drag and drop your shipping label PDF (single or multi-page).
2. Use the interactive margin sliders or presets:
   - **Top Margin (pts)**
   - **Bottom Margin (pts)**
   - **Left Margin (pts)**
   - **Right Margin (pts)**
3. Alternatively, click **Crop to Shipping Label Only** preset.
4. Click **Apply Crop & Download PDF**.
5. Your cropped PDF will download instantly, ready to print perfectly centered on 4x6 thermal paper.

---

### 4.2 PDF Merger
**URL:** `/tools/pdf-merger`  
**Purpose:** Combines multiple shipping labels, tax invoices, or documents into one unified PDF.

#### Step-by-Step Instructions:
1. Click **Add PDFs** and select two or more PDF files from your computer.
2. View the uploaded list. Use the **▲ Move Up** and **▼ Move Down** buttons to re-order your documents.
3. Click **Merge PDFs**.
4. The merged PDF file will download immediately with your exact custom page sequence.

---

### 4.3 PDF Splitter
**URL:** `/tools/pdf-splitter`  
**Purpose:** Splits large multi-page dispatch PDFs into separate single-page documents.

#### Step-by-Step Instructions:
1. Upload a multi-page PDF (e.g. 50 orders in one file).
2. Choose splitting mode:
   - **Split Every Page:** Generates an individual PDF file for each page packaged into a ZIP.
   - **Split by Range:** Specify a range like `1-10`, `11-20`.
3. Click **Split PDF** to download.

---

### 4.4 PDF Page Extractor
**URL:** `/tools/pdf-page-extractor`  
**Purpose:** Extracts only specific pages from a large dispatch batch (e.g. only pages 3, 7, and 12-15).

#### Step-by-Step Instructions:
1. Upload your multi-page PDF document.
2. Enter the page numbers to extract in the input box (e.g., `1, 3, 5-8`).
3. Click **Extract Pages**.
4. Download the newly created PDF containing only the selected pages.

---

### 4.5 PDF Layout (N-up Tool)
**URL:** `/tools/pdf-layout-tool`  
**Purpose:** Formats multiple labels onto a single sheet of paper (2-up, 4-up, 6-up, 8-up) to save paper on standard A4/A5 laser printers.

#### Step-by-Step Instructions:
1. Upload your PDF containing multiple shipping labels or packing slips.
2. Select **Layout Grid:**
   - `1-up` (Full page)
   - `2-up` (2 labels per page side-by-side or stacked)
   - `4-up` (4 labels per A4 page in a 2x2 grid)
   - `6-up` or `8-up` (High-density packing slips)
3. Select **Target Paper Size:** `A4`, `A5`, `Letter`, or `Custom`.
4. Choose **Orientation:** `Portrait` or `Landscape`.
5. Adjust **Margins** and **Spacing** sliders.
6. Click **Generate N-up PDF** and download.

---

### 4.6 PDF Compressor
**URL:** `/tools/pdf-compressor`  
**Purpose:** Optimizes and shrinks PDF file sizes so they comply with marketplace upload limits (e.g. Amazon seller KYC or invoice upload size caps).

#### Step-by-Step Instructions:
1. Upload your oversized PDF file.
2. View original file size.
3. Click **Optimize & Compress**.
4. The tool strips duplicate metadata objects and compresses streams.
5. Download your compressed PDF.

---

### 4.7 PDF Rotator
**URL:** `/tools/pdf-rotator`  
**Purpose:** Permanently fixes upside-down or sideways shipping labels.

#### Step-by-Step Instructions:
1. Upload your PDF.
2. Select rotation angle: **90° Clockwise**, **180°**, or **270° Clockwise (90° Counter-clockwise)**.
3. Choose whether to rotate **All Pages** or **Current Page Only**.
4. Click **Apply Rotation & Download**.

---

### 4.8 PDF Page Reorder
**URL:** `/tools/pdf-page-reorder`  
**Purpose:** Rearranges the order of pages inside a multi-page PDF.

#### Step-by-Step Instructions:
1. Upload your multi-page PDF.
2. Visual thumbnail cards appear for every page.
3. Use the arrow controls or drag cards to arrange the desired order.
4. Click **Export Reordered PDF**.

---

### 4.9 PDF to Image
**URL:** `/tools/pdf-to-image`  
**Purpose:** Converts PDF label pages into high-resolution PNG or JPG image files.

#### Step-by-Step Instructions:
1. Upload your PDF document.
2. Select target format: **PNG** or **JPG**.
3. Select rendering scale: **1x (Standard)** or **2x (High DPI)**.
4. Click **Convert Pages**.
5. Download individual page images or download all images in a convenient ZIP file.

---

### 4.10 Image to PDF
**URL:** `/tools/image-to-pdf`  
**Purpose:** Combines product photos, certificates, or scanned receipts into a single professional PDF document.

#### Step-by-Step Instructions:
1. Click **Add Images** and select one or more JPG, PNG, or WebP files.
2. Reorder images using the order buttons if needed.
3. Choose page orientation: **Auto**, **Portrait**, or **Landscape**.
4. Click **Generate PDF & Download**.

---

## 5. IMAGE TOOLS (Canvas & Web Workers)

*Fast, local in-browser image processing. No waiting on cloud queues or uploading product photography.*

### 5.1 Image Compressor
**URL:** `/tools/image-compressor`  
**Purpose:** Shrinks product image file sizes while preserving sharp product details.

#### Step-by-Step Instructions:
1. Drag and drop single or multiple JPG, PNG, or WebP product images.
2. Adjust the **Quality Slider** (Recommended: `80%` for crisp e-commerce images with 70%+ file savings).
3. Optional: Set **Max Width** (e.g., `1200px`) or **Max Height**.
4. View the table showing: Original Size, New Compressed Size, and Savings %.
5. Download images individually or click **Download All as ZIP**.

---

### 5.2 Image Resizer
**URL:** `/tools/image-resizer`  
**Purpose:** Resizes product photos to meet strict marketplace pixel requirements (e.g. 1000x1000, 1600x1600).

#### Step-by-Step Instructions:
1. Upload your product photo(s).
2. Choose mode:
   - **Exact Dimensions:** Enter Width (px) and Height (px).
   - **Percentage:** Scale by `50%`, `75%`, `150%`, etc.
   - **Max Width / Max Height:** Fits image within maximum boundaries.
3. Toggle **Maintain Aspect Ratio** (Checked by default to prevent distorted photos).
4. Click **Resize & Download** (or batch download ZIP).

---

### 5.3 JPG to PNG Converter
**URL:** `/tools/jpg-to-png`  
**Purpose:** Converts compressed JPG images to lossless PNG format with transparent canvas capability.

#### Step-by-Step Instructions:
1. Upload one or more `.jpg` or `.jpeg` files.
2. Click **Convert to PNG**.
3. Download the resulting PNG files.

---

### 5.4 PNG to JPG Converter
**URL:** `/tools/png-to-jpg`  
**Purpose:** Converts heavy PNG files to lightweight JPG format with a solid background fill.

#### Step-by-Step Instructions:
1. Upload PNG image(s).
2. Select background fill color (Default: **Pure White `#FFFFFF`** for marketplace standards).
3. Adjust JPG quality slider (e.g., `85%`).
4. Click **Convert & Download**.

---

### 5.5 WebP Converter
**URL:** `/tools/webp-converter`  
**Purpose:** Converts JPG and PNG photos into next-generation Google WebP format for high-speed Shopify and WooCommerce storefronts.

#### Step-by-Step Instructions:
1. Upload your product images.
2. Set quality level (Default: `85%`).
3. Click **Convert to WebP**.
4. Enjoy ~30% smaller file sizes than JPG with identical visual clarity!

---

### 5.6 Image Cropper
**URL:** `/tools/image-cropper`  
**Purpose:** Crops product photos to specific e-commerce listing aspect ratios.

#### Step-by-Step Instructions:
1. Upload a product image.
2. Select aspect ratio preset:
   - **1:1 Square** (Amazon, Flipkart, Meesho main product images)
   - **4:5 Vertical** (Instagram Feed, Fashion catalogs)
   - **16:9 Landscape** (Hero banners, website sliders)
   - **Freeform** (Custom manual crop)
3. Adjust the crop boundary box on the live preview canvas.
4. Click **Apply Crop & Download**.

---

### 5.7 Image Background Utility
**URL:** `/tools/image-background`  
**Purpose:** Places transparent product cutouts onto a clean pure white or colored background with customizable padding.

#### Step-by-Step Instructions:
1. Upload an image (ideal for cutouts with transparent backgrounds).
2. Choose Background Color: **Pure White (`#FFFFFF`)**, Solid Color, or transparent.
3. Adjust **Padding Slider** (e.g., `10%` padding to center the item nicely).
4. Download the formatted image.

---

### 5.8 Product Image Formatter
**URL:** `/tools/product-image-formatter`  
**Purpose:** Automatically squares non-standard photos into compliant 1000x1000 marketplace standards without stretching.

#### Step-by-Step Instructions:
1. Upload any rectangular product photo.
2. Select **Canvas Preset:**
   - **Square Product (1000 × 1000 px)** — Standard for Amazon/Flipkart
   - **Marketplace HD (1600 × 1600 px)** — Enables Amazon zoom feature
   - **Instagram Square (1080 × 1080 px)**
   - **A4 Product Sheet**
3. Select **Fit Mode:**
   - `Contain` (Fits entire product inside canvas on white background without cropping).
   - `Cover` (Fills entire canvas).
4. Adjust optional **Padding**, **Border Radius**, and **Drop Shadow**.
5. Click **Download Formatted Image**.

---

### 5.9 Batch Product Resizer
**URL:** `/tools/product-image-batch-resizer`  
**Purpose:** Processes an entire folder of catalog images in one single click and packages them into a clean ZIP archive.

#### Step-by-Step Instructions:
1. Drag and drop 5, 20, or 50 product photos together.
2. Set standard output resolution (e.g., Width `1000px`, Height `1000px`).
3. Choose format: **JPG**, **PNG**, or **WebP**.
4. Click **Process All Images**.
5. Click **Download All as ZIP**. All images are cleanly packaged and renamed!

---

## 6. SELLER UTILITIES

### 6.1 SKU Generator
**URL:** `/tools/sku-generator`  
**Purpose:** Generates systematic, readable stock-keeping unit codes for warehouse tracking.

#### Step-by-Step Instructions:
1. **Configure SKU Attributes:**
   - **Brand Prefix:** e.g., `MG`
   - **Category:** e.g., `SHOE`
   - **Subcategory / Model:** e.g., `RUN`
   - **Color Code:** e.g., `BLK`
   - **Size:** e.g., `42`
   - **Separator:** Choose `-`, `_`, or `/`
2. **Batch Generation:**
   - Set starting sequence number (e.g., `001`) and count (e.g., `10`).
3. **Outputs:**
   - Generated SKUs appear in list: `MG-SHOE-RUN-BLK-42-001`, `MG-SHOE-RUN-BLK-42-002`, etc.
4. **Action:** Click **Copy All** or **Download as CSV**.

---

### 6.2 QR Code Generator
**URL:** `/tools/qr-code-generator`  
**Purpose:** Generates high-resolution vector SVG and PNG QR codes for UPI payments, customer support, and product feedback.

#### Step-by-Step Instructions:
1. **Choose QR Type:**
   - **UPI Payment:** Enter UPI ID (e.g. `seller@okaxis`), Payee Name, and Amount (₹).
   - **WhatsApp:** Enter Phone Number with country code and default message.
   - **Website URL:** Enter your product review link or store URL.
   - **Plain Text / Wi-Fi / Email / Phone**.
2. **Customize Appearance:**
   - Select foreground color, background color, and size (px).
3. **Download:**
   - Click **Download PNG** for digital use or **Download SVG** for infinite lossless vector printing on packaging boxes.

---

### 6.3 Barcode Generator
**URL:** `/tools/barcode-generator`  
**Purpose:** Generates standard e-commerce barcodes with built-in checksum validation.

#### Step-by-Step Instructions:
1. **Choose Symbology:**
   - **Code 128:** For alphanumeric seller SKUs (e.g., `MG-PROD-9988`).
   - **EAN-13:** For 13-digit standard retail barcodes.
   - **EAN-8:** For 8-digit compact product codes.
   - **UPC-A:** For 12-digit North American products.
2. **Enter Value:** The tool validates your input and alerts you if checksum or length is invalid.
3. **Live Preview:** See the barcode with human-readable text underneath.
4. **Download & Print:** Click **Download PNG**, **Download SVG**, or **Print Barcode**.

---

### 6.4 Product Label Generator
**URL:** `/tools/product-label-generator`  
**Purpose:** Creates ready-to-print retail packaging labels and 4x6 thermal barcode labels.

#### Step-by-Step Instructions:
1. **Select Label Template:**
   - **4x6 Thermal Shipping Label**
   - **Retail Product Box Label (with Barcode & MRP)**
   - **Compact SKU Sticker**
2. **Fill in Product Details:**
   - Brand Name, Product Name, SKU, Size / Color, MRP (₹), Selling Price (₹), Net Qty, Month of Mfg, Customer Care Contact.
3. **Configure Barcode / QR:**
   - Enter your barcode number and optional QR code URL.
4. **Live Visual Preview:** See the label update in real-time.
5. **Print or Export:** Click **Print Label** or **Download Label PDF**.

---

### 6.5 Shipping Label Formatter
**URL:** `/tools/shipping-label-formatter`  
**Purpose:** Formats standard courier dispatch cards and customer package labels.

#### Step-by-Step Instructions:
1. Fill in **Sender Details:** Business Name, Address, City, State, Pincode, GSTIN, Phone.
2. Fill in **Recipient / Buyer Details:** Customer Name, Shipping Address, Pincode, Phone.
3. Fill in **Order Details:** Order ID, Tracking AWB Number, Payment Mode (`Prepaid` or `COD`), COD Amount (₹).
4. Click **Print Shipping Slip** or **Download PDF**.

---

### 6.6 GST Invoice Generator
**URL:** `/tools/invoice-generator`  
**Purpose:** Creates clean, commercial GST invoices with automatic tax and total calculation.

#### Step-by-Step Instructions:
1. **Seller Profile:** Company Name, Address, GSTIN, State Code.
2. **Buyer Profile:** Customer Name, Billing Address, Shipping Address, Customer GSTIN (for B2B).
3. **Invoice Metadata:** Invoice Number, Date, Place of Supply, Due Date.
4. **Line Items:** Click **+ Add Item** to add products. For each line enter:
   - Description, HSN Code, Qty, Unit Rate (₹), Discount (₹), GST Rate (5%, 12%, 18%, 28%).
5. **Totals Calculated Automatically:** Subtotal, CGST, SGST, IGST, and Grand Total.
6. **Action:** Click **Download Invoice PDF** or **Print Invoice**. Templates are saved locally in your browser for next time!

---

### 6.7 Product Title Generator
**URL:** `/tools/product-title-generator`  
**Purpose:** Generates high-CTR, algorithm-compliant titles following Amazon and Flipkart guidelines.

#### Step-by-Step Instructions:
1. Enter Brand Name (e.g., `Monty Genius`).
2. Enter Product Type (e.g., `Bluetooth Wireless Headphones`).
3. Enter Key Features / Material (e.g., `40H Playtime, Deep Bass, ANC`).
4. Enter Color & Size (e.g., `Matte Black, Over-Ear`).
5. Click **Generate Titles**.
6. View generated options tailored for **Amazon**, **Flipkart**, and **Meesho**. Click **Copy Title** to use immediately.

---

### 6.8 Product Description Generator
**URL:** `/tools/product-description-generator`  
**Purpose:** Drafts structured, conversion-optimized product descriptions with bullet points.

#### Step-by-Step Instructions:
1. Enter Product Name and Target Audience.
2. Enter 3 to 5 core benefits (e.g., lightweight, sweatproof, 1-year warranty).
3. Click **Generate Description**.
4. The tool outputs:
   - **Hook Paragraph**
   - **5 Bullet Points with Bold Headers**
   - **Technical Specifications Table**
   - **Care / Usage Instructions**
5. Click **Copy Markdown** or **Copy HTML**.

---

### 6.9 Product Keyword Generator
**URL:** `/tools/product-keyword-generator`  
**Purpose:** Generates backend search terms and tags to maximize marketplace search discovery.

#### Step-by-Step Instructions:
1. Enter your main seed keyword (e.g., `water bottle`).
2. Enter target category (e.g., `Kitchen / Fitness`).
3. Click **Generate Keywords**.
4. Get three categorized lists:
   - **High-Volume Search Terms**
   - **Long-Tail Buyer Keywords**
   - **Backend Search Terms (deduplicated under 249 bytes for Amazon)**
5. Click **Copy Backend Search Terms**.

---

### 6.10 HSN Code & GST Helper
**URL:** `/tools/hsn-helper`  
**Purpose:** Instant lookup for Harmonized System of Nomenclature (HSN) codes and applicable GST slabs.

#### Step-by-Step Instructions:
1. Type a product name or category in the search box (e.g., `shoes`, `t-shirt`, `spices`, `electronics`, `cosmetics`).
2. The interactive table displays:
   - **HSN / SAC Code**
   - **Product Description**
   - **Standard GST Rate (%)**
   - **Conditions / Thresholds** (e.g., Footwear below ₹1000 = 12%).
3. Click **Copy HSN** to copy the code directly.

---

### 6.11 CSV Formatter
**URL:** `/tools/csv-formatter`  
**Purpose:** Spreadsheet-like browser editor to view, rename, reorder, and delete columns.

#### Step-by-Step Instructions:
1. Upload your CSV file.
2. View the data in the interactive grid.
3. Uncheck columns to hide/delete them.
4. Click column headers to reorder.
5. Click **Export Formatted CSV**.

---

### 6.12 CSV Cleaner & Deduplicator
**URL:** `/tools/csv-cleaner`  
**Purpose:** Eliminates duplicate products, trims whitespace, and removes blank rows from messy inventory sheets.

#### Step-by-Step Instructions:
1. Upload your CSV file.
2. Select cleaning rules:
   - Remove blank rows.
   - Trim leading & trailing whitespace.
   - Deduplicate rows based on a specific column (e.g., `sku` or `barcode`).
3. View the summary of cleaned vs. removed rows.
4. Click **Download Clean CSV**.

---

### 6.13 Bulk Product Data Formatter
**URL:** `/tools/bulk-product-data-formatter`  
**Purpose:** Mass-formats product titles to Title Case, cleans price symbols (`₹`, `$`, commas), and standardizes SKU formats.

#### Step-by-Step Instructions:
1. Upload your raw catalog CSV.
2. Select transformations:
   - **Title Case conversion** for product names.
   - **Sanitize prices** (strips non-numeric characters).
   - **Uppercase SKUs**.
3. Preview before-and-after differences.
4. Click **Download Standardized CSV**.

---

## 7. AI PRODUCT CONTENT OPTIMIZER

**URL:** `/tools/ai-product-tools`  
**Purpose:** An intelligent, privacy-first listing copywriting assistant supporting multiple AI providers or offline template mode.

### How It Works:
- **No hardcoded keys:** You control your credentials. API keys are stored only in your browser's private local storage.
- **Supported Providers:**
  1. **Google Gemini** (Gemini 1.5 Flash / Pro)
  2. **OpenAI** (GPT-4o, GPT-4o-mini)
  3. **OpenRouter** (Any open-source or commercial model)
  4. **Local Ollama** (100% free offline AI running on `localhost:11434`)
  5. **Offline Rule Engine** (Works immediately even without any AI API key!)

### Step-by-Step Instructions:
1. **Configure Provider (Optional):**
   - Click **AI Settings ⚙️** at the top-right of the tool.
   - Select your provider (e.g., `Google Gemini` or `OpenAI`).
   - Enter your personal API key.
   - Click **Save Key Locally**.
2. **Fill in Product Inputs:**
   - **Product Name:** e.g., `Stainless Steel Insulated Water Bottle`
   - **Key Attributes:** e.g., `1000ml, 24h cold, 12h hot, BPA-free, leak-proof lid`
   - **Target Marketplace:** `Amazon`, `Flipkart`, `Meesho`, or `Shopify`
   - **Tone:** `Professional`, `Persuasive`, `Concise`, or `Premium`
3. **Click "Generate Listing Content":**
4. **Outputs Generated:**
   - **SEO Product Title**
   - **5 High-Converting Bullet Points**
   - **Compelling HTML/Markdown Description**
   - **Backend Search Keywords**
   - **Attribute Suggestions**
5. Click **Copy** on any section to paste into your seller portal.

---

## 8. CHROME EXTENSION SETUP & 1-CLICK FORM AUTOFILL

**Location:** `m:\MONTY GENIUS ECOM TOOLS\extension`  
**Name:** MONTY GENIUS SELLER ASSISTANT (Manifest V3)

### How to Install in Chrome, Edge, or Brave:
1. Open Google Chrome (or Edge / Brave).
2. Type `chrome://extensions/` in the URL bar and press Enter.
3. Toggle the **Developer mode** switch in the top-right corner to **ON**.
4. Click the **Load unpacked** button in the top-left toolbar.
5. In the folder picker dialog, select the `extension` folder:
   ```
   m:\MONTY GENIUS ECOM TOOLS\extension
   ```
6. The extension **MONTY GENIUS SELLER ASSISTANT** will appear in your extensions list.
7. Click the **Puzzle icon** in your Chrome toolbar and **Pin 📌** the extension for 1-click access.

---

### How to Save Product Profiles:
1. Click the **MONTY GENIUS** extension icon in your toolbar.
2. Click the **⚙️ Options** button (or right-click extension icon → Options).
3. Under **Product Catalog**:
   - Enter your product details: Title, Description, SKU, Price, MRP, HSN Code, GST Rate, Brand, Color, Size, Material, Weight.
   - Click **Save Product Profile**.
   - You can store as many products as you want for rapid daily listing!

---

### How to 1-Click Autofill Seller Listing Portals:
1. Open your marketplace seller listing tab (e.g. Amazon Seller Central, Flipkart Seller Hub, Meesho Supplier Panel, Shopify admin, or WooCommerce new product page).
2. Click the **MONTY GENIUS extension icon**.
3. Select your saved product from the dropdown.
4. Click **⚡ Autofill Active Form**.
5. All matching fields (`Title`, `SKU`, `Price`, `MRP`, `HSN`, `Description`) are instantly filled, and native input change events are dispatched so the page saves them immediately!

---

### How to Customize CSS Selectors for Any Marketplace:
If a marketplace updates their input form class names:
1. Open Extension **Options → CSS Selector Mappings**.
2. Find the field you want to modify (e.g. `price`).
3. Enter the target selector (e.g. `input#listing_price`).
4. Click **Test Matching** to verify that the element highlights green on your active tab.
5. Click **Save Mappings**.

---

## 9. BUILT-IN TEST SUITE & PRIVACY CONTROLS

### Running the Live In-App Test Suite:
1. Navigate to `/dev/test-suite` or `/tests` in your browser.
2. The self-test suite executes tests across:
   - Profit formula accuracy (effective discounts, GST bases, net profits).
   - Margin and markup formulas.
   - Break-even equations.
   - SKU generation format algorithms.
   - QR and barcode data validation.
3. View the test results to verify all calculations.

### Privacy & Data Clearing:
1. Navigate to `/privacy`.
2. All saved marketplace profiles, calculator presets, and custom settings live inside your browser's local `localStorage` and `IndexedDB`.
3. To wipe all saved data at any time, click **Clear All Local Data**.

---

## 10. END-TO-END REAL-WORLD SELLER PLAYBOOKS

### Playbook A: Launching a New Product (Zero-to-Listed)
1. **Step 1: Calculate Viability:** Open `/tools/product-pricing-calculator`. Enter manufacturing cost and desired 25% profit to get your target selling price.
2. **Step 2: Check HSN & GST:** Open `/tools/hsn-helper`. Find your tax code and GST rate.
3. **Step 3: Generate SKU & Barcode:** Open `/tools/sku-generator` to create a SKU, then `/tools/barcode-generator` to download the Code 128 / EAN-13 barcode sticker.
4. **Step 4: Format Product Images:** Open `/tools/product-image-formatter`. Drop your camera photos and convert them to compliant 1000x1000 square images with clean white backgrounds.
5. **Step 5: Write Content:** Open `/tools/ai-product-tools`. Generate titles, bullet points, and backend search terms.
6. **Step 6: Quick List:** Open your Chrome Extension popup and click **Autofill Active Form** on your seller portal!

---

### Playbook B: Daily Order Dispatch & Shipping Label Printing
1. **Step 1: Download Batch:** Download the daily dispatch PDF from your marketplace portal.
2. **Step 2: Crop Shipping Labels:** Open `/tools/pdf-cropper`. Drop the batch PDF to trim unwanted header and invoice margins.
3. **Step 3: Thermal or A4 Print:**
   - For **4x6 Thermal Printers**: Print directly after crop.
   - For **A4 Laser Printers**: Open `/tools/pdf-layout-tool`, select `4-up` or `2-up` to print multiple labels on a single sheet of paper.
4. **Step 4: Customer Invoice:** If a retail invoice is required, use `/tools/invoice-generator` to print or save the GST invoice.
5. **Step 5: Pack & Ship!**

---

**Designed with ❤️ by Mr. Monty Genius**  
*MONTY GENIUS ECOM TOOLS — Free Tools for Smart Online Sellers*
