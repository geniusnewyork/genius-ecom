export const BRAND = {
  name: 'MONTY GENIUS',
  productName: 'MONTY GENIUS ECOM TOOLS',
  extensionName: 'MONTY GENIUS SELLER ASSISTANT',
  tagline: 'Free Tools for Smart Online Sellers',
  footer: 'Designed with ❤️ by Mr. Monty Genius',
  supportEmail: 'support@montygenius.com',
};

export const FEATURES = {
  BASIC_CALCULATORS: {
    label: 'Basic Calculators',
    description: 'Access to 10 comprehensive profit, pricing, GST, and margin calculators.',
  },
  PDF_TOOLS: {
    label: 'Client-Side PDF Tools',
    description: '10 browser-based PDF utilities: cropping, merging, splitting, n-up layout.',
  },
  IMAGE_TOOLS: {
    label: 'Product Image Tools',
    description: 'Compress, resize, WebP conversion, 1000x1000 square formatter.',
  },
  SELLER_EXTENSION: {
    label: 'Seller Assistant Extension',
    description: 'Manifest V3 Chrome Extension with in-page inspection and autofill.',
  },
  AUTOFILL: {
    label: '1-Click Autofill Engine',
    description: 'Autofill listings on Meesho, Amazon, Flipkart, Shopify, and WooCommerce.',
  },
  ADVANCED_SKU: {
    label: 'Batch SKU & Barcode Generator',
    description: 'High-volume systematic SKU creation and Code 128 / EAN-13 barcodes.',
  },
  AI_TOOLS: {
    label: 'AI Content Optimizer',
    description: 'Multi-provider AI generation for titles, bullet points, and backend search terms.',
  },
  BULK_TOOLS: {
    label: 'Bulk CSV Tools',
    description: 'Bulk pricing calculator, CSV cleaner, deduplicator, and column mapper.',
  },
  MULTI_DEVICE: {
    label: 'Multi-Device Activation',
    description: 'Activate on multiple laptops or workstations simultaneously.',
  },
  TEAM_SUPPORT: {
    label: 'Team & Multi-User Support',
    description: 'Centralized catalog synchronization and multi-seat management.',
  },
};

export const DEFAULT_PLANS = {
  FREE: {
    id: 'FREE',
    name: 'Free Forever',
    price: 0,
    currency: 'INR',
    durationDays: 0,
    maxDevices: 1,
    features: ['BASIC_CALCULATORS', 'PDF_TOOLS', 'IMAGE_TOOLS', 'BULK_TOOLS'],
    active: true,
    description: 'Essential web tools for individuals and budding e-commerce sellers.',
  },
  PRO: {
    id: 'PRO',
    name: 'Seller Pro',
    price: 499,
    currency: 'INR',
    durationDays: 365,
    maxDevices: 2,
    features: [
      'BASIC_CALCULATORS',
      'PDF_TOOLS',
      'IMAGE_TOOLS',
      'BULK_TOOLS',
      'SELLER_EXTENSION',
      'AUTOFILL',
      'ADVANCED_SKU',
      'AI_TOOLS',
    ],
    active: true,
    description: 'Complete seller suite with Seller Assistant Chrome Extension & 1-Click Autofill.',
  },
  BUSINESS: {
    id: 'BUSINESS',
    name: 'Business Growth',
    price: 1499,
    currency: 'INR',
    durationDays: 365,
    maxDevices: 5,
    features: [
      'BASIC_CALCULATORS',
      'PDF_TOOLS',
      'IMAGE_TOOLS',
      'BULK_TOOLS',
      'SELLER_EXTENSION',
      'AUTOFILL',
      'ADVANCED_SKU',
      'AI_TOOLS',
      'MULTI_DEVICE',
      'TEAM_SUPPORT',
    ],
    active: true,
    description: 'For growing e-commerce brands with multiple staff members and packing stations.',
  },
  LIFETIME: {
    id: 'LIFETIME',
    name: 'Lifetime Founder',
    price: 2999,
    currency: 'INR',
    durationDays: 0,
    maxDevices: 3,
    features: [
      'BASIC_CALCULATORS',
      'PDF_TOOLS',
      'IMAGE_TOOLS',
      'BULK_TOOLS',
      'SELLER_EXTENSION',
      'AUTOFILL',
      'ADVANCED_SKU',
      'AI_TOOLS',
      'MULTI_DEVICE',
    ],
    active: true,
    description: 'One-time investment. All current and future Pro features included forever.',
  },
};

export const VERSION_CONFIG = {
  minSupportedExtensionVersion: '1.0.0',
  latestExtensionVersion: '1.0.0',
  offlineGracePeriodHours: 72,
};

export function hasFeature(planOrFeatures, feature) {
  if (Array.isArray(planOrFeatures)) {
    return planOrFeatures.includes(feature);
  }
  if (typeof planOrFeatures === 'string') {
    const plan = DEFAULT_PLANS[planOrFeatures];
    return plan ? plan.features.includes(feature) : false;
  }
  return planOrFeatures?.features ? planOrFeatures.features.includes(feature) : false;
}
