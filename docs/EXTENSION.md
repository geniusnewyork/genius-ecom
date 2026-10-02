# MONTY GENIUS SELLER ASSISTANT — CHROME EXTENSION

> Manifest V3 Chrome Extension for E-Commerce Seller Productivity  
> Designed with ❤️ by Mr. Monty Genius

---

## 1. Overview & Purpose

**MONTY GENIUS SELLER ASSISTANT** is a lightweight, user-authorized Chrome Extension (Manifest V3) created to streamline repetitive catalog listings on online seller portals.

### Safety & Compliance Guarantees:
- **No CAPTCHA Bypass:** The extension never attempts to solve or bypass CAPTCHAs.
- **No Auth Bypass:** The extension operates purely within user-authenticated sessions.
- **No Restricted Scraping:** No private, copyrighted, or restricted marketplace data is accessed or extracted.
- **No Hidden Background Tasks:** Actions occur strictly upon the seller's direct click.
- **100% Local Storage:** Product catalogs and selector mappings never leave the browser.

---

## 2. Directory Architecture

```
extension/
├── manifest.json       # Manifest V3 configuration & permissions
├── background.js       # Background service worker (defaults & messaging)
├── content.js          # In-page autofill, inspector & selector testing
├── popup.html          # Quick launcher popup UI
├── popup.css           # Premium dark/light styling
├── popup.js            # Product selection & autofill dispatch
├── options.html        # Selector mapping editor & catalog management UI
├── options.js          # Mapping logic & test runner
└── icons/              # Extension icons (16px, 48px, 128px)
```

---

## 3. How to Install / Load in Chrome

1. Open Google Chrome (or any Chromium browser: Brave, Edge, Opera).
2. Navigate to `chrome://extensions/` in the address bar.
3. Enable **Developer mode** toggle in the top-right corner.
4. Click **Load unpacked** in the top-left toolbar.
5. Select the `extension` folder located in this repository:
   ```
   m:\MONTY GENIUS ECOM TOOLS\extension
   ```
6. The extension **MONTY GENIUS SELLER ASSISTANT** will appear in your Chrome toolbar. Pin it for easy access!

---

## 4. Configurable CSS Selector Mapping

Instead of using fragile hardcoded selectors that break whenever marketplaces update their UI, MONTY GENIUS allows the seller to map their own CSS selectors:

| Field Name | Default Fallback Selector | Purpose |
|---|---|---|
| `title` | `input[name="title"], input[placeholder*="Title" i]` | Product Title |
| `description` | `textarea[name="description"], #description` | Product Description |
| `sku` | `input[name="sku"], #sku` | Seller SKU |
| `price` | `input[name="price"], #price` | Selling Price |
| `mrp` | `input[name="mrp"], #mrp` | Maximum Retail Price |
| `hsn` | `input[name="hsn"], #hsn` | HSN / SAC Tax Code |
| `gst` | `input[name="gst"], select[name="gst_rate"]` | Applicable GST Slab |
| `brand` | `input[name="brand"], #brand` | Brand Name |
| `color` | `input[name="color"], #color` | Product Color |
| `size` | `input[name="size"], #size` | Size Spec |
| `material` | `input[name="material"], #material` | Fabric / Composition |
| `weight` | `input[name="weight"], #weight` | Package Weight (kg) |

### How to Test or Customize Selectors:
1. Right-click the extension icon and select **Options** (or click the ⚙️ gear icon in the popup).
2. On the **CSS Selector Mappings** tab, edit any selector string (e.g., `input.product-name-input`).
3. Click **Test Matching** — the extension will query the active tab and outline matching elements in green!
4. Click **Save All Mappings**.

---

## 5. 1-Click Form Autofill Workflow

1. Open your seller portal tab (e.g. your listing draft page).
2. Click the **MONTY GENIUS** extension icon in your toolbar.
3. Choose the product from the **Select Saved Product** dropdown.
4. Click **⚡ Autofill Active Form**.
5. All matching input fields will be populated with native input events dispatched, so dynamic forms register the changes immediately!
