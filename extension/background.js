/**
 * MONTY GENIUS SELLER ASSISTANT - Background Service Worker (Manifest V3)
 * Designed with ❤️ by Mr. Monty Genius
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log('[MONTY GENIUS] Seller Assistant Installed');

  // Initialize default mappings and sample product if empty
  chrome.storage.local.get(['products', 'mappings'], (data) => {
    if (!data.products || data.products.length === 0) {
      const defaultProducts = [
        {
          id: 'sample-prod-1',
          title: 'Premium Cotton T-Shirt',
          description: 'High-quality 100% combed cotton, breathable fabric for daily comfort.',
          sku: 'MG-TSHIRT-001',
          price: '499',
          mrp: '999',
          hsn: '6109',
          gst: '5',
          brand: 'Monty Genius',
          color: 'Black',
          size: 'M',
          material: 'Cotton',
          weight: '0.2'
        }
      ];
      chrome.storage.local.set({ products: defaultProducts });
    }

    if (!data.mappings) {
      const defaultMappings = [
        { field: 'title', selector: 'input[name="title"], input[name="product_title"], #title, input[placeholder*="Title" i]', enabled: true },
        { field: 'description', selector: 'textarea[name="description"], #description, textarea[placeholder*="Description" i]', enabled: true },
        { field: 'sku', selector: 'input[name="sku"], input[name="seller_sku"], #sku', enabled: true },
        { field: 'price', selector: 'input[name="price"], input[name="selling_price"], #price', enabled: true },
        { field: 'mrp', selector: 'input[name="mrp"], input[name="original_price"], #mrp', enabled: true },
        { field: 'hsn', selector: 'input[name="hsn"], input[name="hsn_code"], #hsn', enabled: true },
        { field: 'gst', selector: 'input[name="gst"], select[name="gst_rate"], #gst', enabled: true },
        { field: 'brand', selector: 'input[name="brand"], input[name="brand_name"], #brand', enabled: true },
        { field: 'color', selector: 'input[name="color"], #color', enabled: true },
        { field: 'size', selector: 'input[name="size"], #size', enabled: true },
        { field: 'material', selector: 'input[name="material"], #material', enabled: true },
        { field: 'weight', selector: 'input[name="weight"], #weight', enabled: true }
      ];
      chrome.storage.local.set({ mappings: defaultMappings });
    }
  });
});
