# PRIVACY ARCHITECTURE & DATA POLICY

# MONTY GENIUS ECOM TOOLS
> Free Tools for Smart Online Sellers  
> Designed with ❤️ by Mr. Monty Genius

---

## 1. Zero-Upload Architectural Rule

**MONTY GENIUS ECOM TOOLS** operates on a zero-upload design principle:
1. **No Backend Database Required:** The web platform does not maintain a private server database to store uploaded seller files.
2. **In-Browser Processing:** Calculations, PDF transformations, barcode renderings, image resizing, and spreadsheet cleanups execute completely inside the user's web browser environment using JavaScript and HTML5 APIs.
3. **No Hidden Telemetry:** There are no hidden keystroke trackers, screen recorders, or ad tracking pixels.

---

## 2. Local Storage Usage

The application stores strictly non-sensitive UI settings on the client device:
- **`monty-genius-app-storage`:**
  - `theme`: `dark` | `light` | `system`
  - `favorites`: Array of favorited tool IDs (e.g. `['profit-calculator', 'gst-calculator']`)
  - `recentTools`: Array of recently opened tool IDs with timestamps
- **`mg_invoice_template`:**
  - Default business name, GSTIN, and seller address (optional convenience setting to avoid re-typing when generating invoices)
- **`mg_ai_key` & `mg_ai_provider`:**
  - User-provided optional AI API keys. These keys are never transmitted to any Monty Genius server. They are sent directly from the client to the chosen AI provider's official API endpoint.

---

## 3. Chrome Extension Privacy

The **MONTY GENIUS SELLER ASSISTANT** extension:
- Requests only `activeTab`, `storage`, and `scripting` permissions.
- Only interacts with the DOM when the user explicitly triggers "Autofill Active Form" or "Save From Page".
- Does NOT monitor browsing history across other tabs.
- Does NOT transmit saved product details to any remote server.
- Stores catalog data securely in `chrome.storage.local`.

---

## 4. How to Clear All Local Data

Sellers can wipe all stored preferences, favorites, and recent history at any time:
1. Click the **Clear** button on the homepage dashboard.
2. Or clear the browser's cookies and site data for the domain.
