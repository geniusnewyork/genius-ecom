// MONTY GENIUS SELLER ASSISTANT — Generic Adapter

import { BaseMarketplaceAdapter } from '../baseAdapter.js';

export class GenericAdapter extends BaseMarketplaceAdapter {
  constructor() {
    super('generic', 'Generic E-Commerce Form Adapter');
  }

  matches(url) {
    // Fallback for any website
    return true;
  }

  async autofill(product, mappings) {
    const results = {
      filled: 0,
      fields: [],
      errors: [],
    };

    if (!mappings || !Array.isArray(mappings)) return results;

    for (const item of mappings) {
      if (!item.enabled) continue;
      const val = product[item.field];
      if (val === undefined || val === null || val === '') continue;

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
