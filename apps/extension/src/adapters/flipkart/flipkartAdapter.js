// MONTY GENIUS SELLER ASSISTANT — Flipkart Adapter

import { BaseMarketplaceAdapter } from '../baseAdapter.js';

export class FlipkartAdapter extends BaseMarketplaceAdapter {
  constructor() {
    super('flipkart', 'Flipkart Seller Hub Adapter');
  }

  matches(url) {
    return url.includes('seller.flipkart.com');
  }

  async autofill(product, customMappings) {
    const flipkartSelectors = [
      { field: 'sku', selector: 'input[name="seller_sku"], input[id*="seller_sku"], input[placeholder*="SKU" i]' },
      { field: 'price', selector: 'input[name="selling_price"], input[id*="selling_price"]' },
      { field: 'mrp', selector: 'input[name="mrp"], input[id*="mrp"]' },
      { field: 'hsn', selector: 'input[name="hsn"], input[id*="hsn"]' },
      { field: 'gst', selector: 'input[name="tax_code"], select[name="tax_code"]' },
      { field: 'weight', selector: 'input[name="package_weight"], input[id*="weight"]' },
    ];

    const results = { filled: 0, fields: [], errors: [] };

    for (const item of flipkartSelectors) {
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
