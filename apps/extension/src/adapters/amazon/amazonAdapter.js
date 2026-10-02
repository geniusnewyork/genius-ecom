// MONTY GENIUS SELLER ASSISTANT — Amazon Adapter

import { BaseMarketplaceAdapter } from '../baseAdapter.js';

export class AmazonAdapter extends BaseMarketplaceAdapter {
  constructor() {
    super('amazon', 'Amazon Seller Central Adapter');
  }

  matches(url) {
    return url.includes('sellercentral.amazon');
  }

  async autofill(product, customMappings) {
    const amazonSelectors = [
      { field: 'title', selector: 'input[name="item_name"], input[id*="item_name"], input[placeholder*="Item Name" i]' },
      { field: 'sku', selector: 'input[name="item_sku"], input[id*="sku"], input[placeholder*="Seller SKU" i]' },
      { field: 'price', selector: 'input[name="standard_price"], input[id*="standard_price"]' },
      { field: 'mrp', selector: 'input[name="list_price"], input[id*="list_price"]' },
      { field: 'brand', selector: 'input[name="brand_name"], input[id*="brand_name"]' },
      { field: 'hsn', selector: 'input[name="hsn_code"], input[id*="hsn_code"]' },
      { field: 'description', selector: 'textarea[name="product_description"], textarea[id*="product_description"]' },
    ];

    const results = { filled: 0, fields: [], errors: [] };

    for (const item of amazonSelectors) {
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
