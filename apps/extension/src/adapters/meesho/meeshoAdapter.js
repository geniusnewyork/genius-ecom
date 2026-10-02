// MONTY GENIUS SELLER ASSISTANT — Meesho Adapter

import { BaseMarketplaceAdapter } from '../baseAdapter.js';

export class MeeshoAdapter extends BaseMarketplaceAdapter {
  constructor() {
    super('meesho', 'Meesho Supplier Panel Adapter');
  }

  matches(url) {
    return url.includes('supplier.meesho.com') || url.includes('meesho.com/supplier');
  }

  async autofill(product, customMappings) {
    const meeshoSelectors = [
      { field: 'title', selector: 'input[name="product_title"], input[placeholder*="Product Name" i], input[id*="title" i]' },
      { field: 'sku', selector: 'input[name="sku_id"], input[placeholder*="Product SKU" i], input[id*="sku" i]' },
      { field: 'price', selector: 'input[name="price"], input[placeholder*="Meesho Price" i], input[name="listing_price"]' },
      { field: 'mrp', selector: 'input[name="mrp"], input[placeholder*="Wrong MRP" i], input[name="max_retail_price"]' },
      { field: 'gst', selector: 'select[name="gst"], select[name="tax_rate"], input[name="gst"]' },
      { field: 'hsn', selector: 'input[name="hsn_code"], input[placeholder*="HSN Code" i]' },
      { field: 'color', selector: 'input[name="color"], select[name="color"]' },
      { field: 'size', selector: 'select[name="size"], input[name="size"]' },
      { field: 'weight', selector: 'input[name="package_weight"], input[placeholder*="Package Weight" i]' },
      { field: 'description', selector: 'textarea[name="description"], textarea[placeholder*="Description" i]' },
    ];

    const results = { filled: 0, fields: [], errors: [] };

    for (const item of meeshoSelectors) {
      const val = product[item.field];
      if (!val) continue;

      try {
        const el = document.querySelector(item.selector);
        if (el) {
          const success = this.fillElement(el, val);
          if (success) {
            results.filled++;
            results.fields.push(item.field);
          }
        }
      } catch (err) {
        results.errors.push({ field: item.field, error: err.message });
      }
    }

    return results;
  }
}
