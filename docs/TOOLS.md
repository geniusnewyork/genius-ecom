# TOOLS DIRECTORY & SPECIFICATIONS

# MONTY GENIUS ECOM TOOLS
> Comprehensive catalog of implemented seller tools, operations, mathematical formulas, and capabilities.

---

## 1. SELLER CALCULATORS

### 1. Profit Calculator (`/tools/profit-calculator`)
- **Inputs:** Product Cost, Packaging Cost, Shipping Cost, Marketplace Fee %, GST %, Advertising Cost, Other Costs, Selling Price, Return/RTO Cost, Discount %.
- **Outputs:** Gross Revenue, Total Cost, Marketplace Commission Amount, GST Amount, Net Profit, Profit Margin (%), Break-even Selling Price, Loss Amount.
- **Formulas:**
  $$\text{Effective Price} = \text{Selling Price} \times (1 - \text{Discount}\%)$$
  $$\text{Marketplace Fee} = \text{Effective Price} \times \text{Fee}\%$$
  $$\text{GST Base} = \frac{\text{Effective Price}}{1 + \text{GST}\%}$$
  $$\text{GST Amount} = \text{Effective Price} - \text{GST Base}$$
  $$\text{Total Cost} = \text{Product} + \text{Packaging} + \text{Shipping} + \text{Fee} + \text{GST} + \text{Ads} + \text{Other} + \text{Return}$$
  $$\text{Net Profit} = \text{Effective Price} - \text{Total Cost}$$
  $$\text{Profit Margin} = \left(\frac{\text{Net Profit}}{\text{Effective Price}}\right) \times 100$$
- **Features:** Visual cost breakdown chart (Recharts), live updates, Reset, Copy Result, Print, Download calculation text.

### 2. Product Pricing Calculator (`/tools/product-pricing-calculator`)
- **Inputs:** Product Cost, Packaging, Shipping, Marketplace Commission %, Fixed Fee, GST %, Expected Profit %, Advertising Cost, Return/RTO %.
- **Outputs:** Recommended Selling Price, Minimum Selling Price, Expected Profit, Expected Margin, Break-even price.
- **Features:** Dynamic cost structure factoring both variable commissions and statutory GST extractions.

### 3. GST Calculator (`/tools/gst-calculator`)
- **Modes:** Inclusive (tax extraction) and Exclusive (tax addition).
- **Inputs:** Amount, GST Rate (Presets: 5%, 12%, 18%, 28%, and Custom).
- **Outputs:** Base Amount, Total GST, CGST (50%), SGST (50%), Final Amount.

### 4. Margin Calculator (`/tools/margin-calculator`)
- **Inputs:** Cost Price, Selling Price.
- **Outputs:** Gross Profit, Gross Margin Percentage, Markup Percentage.
- **Formulas:**
  $$\text{Margin} = \frac{\text{SP} - \text{CP}}{\text{SP}} \times 100 \quad\vert\quad \text{Markup} = \frac{\text{SP} - \text{CP}}{\text{CP}} \times 100$$

### 5. RTO Profit Calculator (`/tools/rto-calculator`)
- **Inputs:** Total Orders, Delivered Orders, RTO Orders, Product Cost, Forward Shipping, Return Shipping, Packaging Cost, Selling Price.
- **Outputs:** RTO Rate (%), Delivered Rate (%), Loss per RTO, Total RTO Loss, Adjusted Profit per Delivered Order.

### 6. Return Loss Calculator (`/tools/return-loss-calculator`)
- **Inputs:** Monthly Orders, Return Rate %, Reverse Courier Fee, Packaging Waste, Damaged Product Loss %.
- **Outputs:** Monthly Returned Units, Direct Shipping Loss, Dead Inventory Loss, Total Return Financial Loss.

### 7. Marketplace Fee Calculator (`/tools/marketplace-fee-calculator`)
- **Inputs:** Selling Price, Commission %, Fixed Fee, Shipping, GST %, Other Deductions.
- **Presets:** User-configurable presets for Meesho, Amazon, Flipkart, and Custom.
- **Outputs:** Commission Deduction, Platform Fees, Total Deductions, Estimated Seller Payout.

### 8. Break-Even Calculator (`/tools/break-even-calculator`)
- **Inputs:** Fixed Overhead Costs, Unit Selling Price, Unit Variable Cost.
- **Outputs:** Break-even Units, Break-even Revenue, Contribution Margin per Unit, Contribution Margin Ratio.

### 9. Discount Calculator (`/tools/discount-calculator`)
- **Inputs:** Original Price, Discount Percentage (or flat off).
- **Outputs:** Final Sale Price, Total Customer Savings.

### 10. Bulk Pricing Calculator (`/tools/bulk-pricing-calculator`)
- **Inputs:** CSV Spreadsheet Upload (SKU, Name, Cost, Shipping, SP, Comm%, GST%).
- **Processing:** Hundred/thousands of rows in browser memory without server upload.
- **Outputs:** Computed row-by-row Profit & Margin, summary stats, CSV export, clipboard copy.

---

## 2. PDF TOOLS (100% In-Browser)

11. **PDF Cropper (`/tools/pdf-cropper`):** Crop margins on all pages to optimize shipping labels for thermal printers.
12. **PDF Merger (`/tools/pdf-merger`):** Merge multiple distinct PDF files into a single ordered PDF.
13. **PDF Splitter (`/tools/pdf-splitter`):** Split multi-page documents into individual pages or ranges.
14. **PDF Page Extractor (`/tools/pdf-page-extractor`):** Extract specific page indices from large PDFs.
15. **PDF Layout / N-up Tool (`/tools/pdf-layout-tool`):** Multi-page grid layout (1, 2, 4, 6, 8-up) onto A4/A5 sheets.
16. **PDF Compressor (`/tools/pdf-compressor`):** Client-side compression and stream optimization.
17. **PDF Rotator (`/tools/pdf-rotator`):** Correct landscape/portrait rotations by 90°, 180°, 270°.
18. **PDF Page Reorder (`/tools/pdf-page-reorder`):** Re-sequence pages before final export.
19. **PDF to Image (`/tools/pdf-to-image`):** Render PDF pages to raster images using canvas.
20. **Image to PDF (`/tools/image-to-pdf`):** Compile JPG/PNG images into a standardized PDF.

---

## 3. IMAGE TOOLS (Canvas & Web Workers)

21. **Image Compressor (`/tools/image-compressor`):** Multi-file compression with quality slider, max dimension bounds, savings percentage, and batch ZIP export.
22. **Image Resizer (`/tools/image-resizer`):** Dimensions, width/height max, percentage scaling with aspect ratio lock and ZIP export.
23. **JPG to PNG (`/tools/jpg-to-png`):** Convert JPEG to lossless PNG format in browser.
24. **PNG to JPG (`/tools/png-to-jpg`):** Convert PNG to JPG with background fill.
25. **WebP Converter (`/tools/webp-converter`):** Transform heavy raster files into lightweight WebP.
26. **Image Cropper (`/tools/image-cropper`):** Preset aspect ratios for marketplace product listings.
27. **Image Background Utility (`/tools/image-background`):** Add solid or white backgrounds and padding to product cutouts.
28. **Product Image Formatter (`/tools/product-image-formatter`):** Format images to standard square canvases (Amazon 1000x1000, Instagram, etc.).
29. **Batch Resizer (`/tools/product-image-batch-resizer`):** Process entire folders of product images in one pass.

---

## 4. SELLER UTILITIES

30. **SKU Generator (`/tools/sku-generator`):** Build structured inventory codes with prefixes, categories, colors, sizes, and sequences.
31. **QR Code Generator (`/tools/qr-code-generator`):** URL, Plain Text, WhatsApp, UPI Payment, Email, Phone, and Wi-Fi networks with PNG and vector SVG export.
32. **Barcode Generator (`/tools/barcode-generator`):** Standard Code 128, EAN-13, EAN-8, UPC-A with input validation, SVG, PNG, and print output.
33. **Product Label Generator (`/tools/product-label-generator`):** Printable thermal (4x6) and sheet labels with live barcodes, QR codes, MRP, prices, and PDF export.
34. **Shipping Label Formatter (`/tools/shipping-label-formatter`):** Standard dispatch cards and customer package labels.
35. **GST Invoice Generator (`/tools/invoice-generator`):** Commercial invoice drafting with customizable seller/buyer profiles, tax calculation, PDF export, and local storage.
36. **Product Title Generator (`/tools/product-title-generator`):** SEO title generation following marketplace search algorithm guidelines.
37. **Product Description Generator (`/tools/product-description-generator`):** Benefit-focused eCommerce copywriting.
38. **Product Keyword Generator (`/tools/product-keyword-generator`):** High-volume backend search terms and tags.
39. **HSN Code Helper (`/tools/hsn-helper`):** Search common Harmonized System codes and GST tax rates.
40. **CSV Formatter (`/tools/csv-formatter`):** Interactive browser spreadsheet preview with column reordering and deletion.
41. **CSV Cleaner (`/tools/csv-cleaner`):** Remove empty lines, trim whitespace, and eliminate duplicate rows.
42. **Bulk Product Data Formatter (`/tools/bulk-product-data-formatter`):** Standardize titles, prices, and inventory codes across mass catalogs.
43. **AI Product Content Optimizer (`/tools/ai-product-tools`):** Multi-provider AI assistant (OpenAI, Gemini, OpenRouter, Ollama, and offline rule engine).
