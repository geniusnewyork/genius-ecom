import type { Tool, ToolCategory } from '../types';

export const tools: Tool[] = [
  // CALCULATORS
  { 
    id: 'profit-calculator', 
    name: 'Profit Calculator', 
    description: 'Calculate net profit, margins, expenses and break-even selling price with live visual cards.', 
    category: 'calculators', 
    icon: 'Calculator', 
    path: '/tools/profit-calculator', 
    keywords: ['profit', 'net profit', 'margin', 'selling price', 'break even', 'costs', 'calculator'], 
    isPro: false 
  },
  { 
    id: 'product-pricing-calculator', 
    name: 'Product Pricing Calculator', 
    description: 'Determine recommended and minimum selling prices based on target profit margins and fee rates.', 
    category: 'calculators', 
    icon: 'Tag', 
    path: '/tools/product-pricing-calculator', 
    keywords: ['price', 'pricing', 'profit', 'margin', 'selling price', 'target margin', 'calculator'], 
    isPro: false 
  },
  { 
    id: 'gst-calculator', 
    name: 'GST Calculator', 
    description: 'Compute inclusive and exclusive GST amounts instantly with 5%, 12%, 18%, 28% and custom rates.', 
    category: 'calculators', 
    icon: 'Percent', 
    path: '/tools/gst-calculator', 
    keywords: ['gst', 'tax', 'cgst', 'sgst', 'inclusive', 'exclusive', 'vat', 'calculator'], 
    isPro: false 
  },
  { 
    id: 'margin-calculator', 
    name: 'Margin Calculator', 
    description: 'Find gross profit margins, markups, and cost-to-revenue ratios.', 
    category: 'calculators', 
    icon: 'TrendingUp', 
    path: '/tools/margin-calculator', 
    keywords: ['margin', 'profit', 'gross margin', 'markup', 'percentage', 'calculator'], 
    isPro: false 
  },
  { 
    id: 'rto-calculator', 
    name: 'RTO Profit Calculator', 
    description: 'Estimate return-to-origin loss rates, shipping waste, and adjusted net profit per delivered order.', 
    category: 'calculators', 
    icon: 'RotateCcw', 
    path: '/tools/rto-calculator', 
    keywords: ['rto', 'return', 'profit', 'rto profit', 'rto loss', 'courier loss', 'reverse shipping', 'calculator'], 
    isPro: false 
  },
  { 
    id: 'return-loss-calculator', 
    name: 'Return Loss Calculator', 
    description: 'Calculate bottom-line losses and damages incurred from customer returns and courier returns.', 
    category: 'calculators', 
    icon: 'AlertTriangle', 
    path: '/tools/return-loss-calculator', 
    keywords: ['return', 'loss', 'customer return', 'damage', 'profit loss', 'calculator'], 
    isPro: false 
  },
  { 
    id: 'marketplace-fee-calculator', 
    name: 'Marketplace Fee Calculator', 
    description: 'Estimate seller deductions and payouts with configurable Meesho, Amazon, and Flipkart presets.', 
    category: 'calculators', 
    icon: 'ShoppingBag', 
    path: '/tools/marketplace-fee-calculator', 
    keywords: ['fee', 'marketplace', 'commission', 'amazon', 'flipkart', 'meesho', 'fixed fee', 'calculator'], 
    isPro: false 
  },
  { 
    id: 'break-even-calculator', 
    name: 'Break-Even Calculator', 
    description: 'Calculate unit sales and gross revenue needed to cover fixed overheads and variable production costs.', 
    category: 'calculators', 
    icon: 'Target', 
    path: '/tools/break-even-calculator', 
    keywords: ['break even', 'breakeven', 'fixed cost', 'units', 'target sales', 'profit', 'calculator'], 
    isPro: false 
  },
  { 
    id: 'discount-calculator', 
    name: 'Discount Calculator', 
    description: 'Calculate discounted sale prices, percentage reductions, and net customer savings.', 
    category: 'calculators', 
    icon: 'Gift', 
    path: '/tools/discount-calculator', 
    keywords: ['discount', 'sale', 'promo', 'coupon', 'savings', 'calculator'], 
    isPro: false 
  },
  { 
    id: 'bulk-pricing-calculator', 
    name: 'Bulk Pricing Calculator', 
    description: 'Upload product spreadsheets and compute bulk profit margins locally inside your browser.', 
    category: 'calculators', 
    icon: 'Layers', 
    path: '/tools/bulk-pricing-calculator', 
    keywords: ['bulk', 'bulk pricing', 'wholesale', 'csv upload', 'profit', 'calculator'], 
    isPro: false 
  },

  // PDF TOOLS
  { 
    id: 'pdf-cropper', 
    name: 'PDF Cropper', 
    description: 'Crop margins and headers of shipping labels, packing slips, and order invoices.', 
    category: 'pdf', 
    icon: 'Crop', 
    path: '/tools/pdf-cropper', 
    keywords: ['pdf', 'crop', 'shipping label', 'packing slip', 'margins', 'trim'], 
    isPro: false 
  },
  { 
    id: 'pdf-merger', 
    name: 'PDF Merger', 
    description: 'Merge multiple PDF files into a single unified document with custom ordering.', 
    category: 'pdf', 
    icon: 'FilePlus', 
    path: '/tools/pdf-merger', 
    keywords: ['pdf', 'merge', 'combine', 'join', 'batch pdf'], 
    isPro: false 
  },
  { 
    id: 'pdf-splitter', 
    name: 'PDF Splitter', 
    description: 'Split large multi-page PDF documents into individual files or separate page ranges.', 
    category: 'pdf', 
    icon: 'Scissors', 
    path: '/tools/pdf-splitter', 
    keywords: ['pdf', 'split', 'divide', 'separate', 'extract'], 
    isPro: false 
  },
  { 
    id: 'pdf-page-extractor', 
    name: 'PDF Page Extractor', 
    description: 'Extract specific pages or page intervals from your PDF documents.', 
    category: 'pdf', 
    icon: 'FileOutput', 
    path: '/tools/pdf-page-extractor', 
    keywords: ['pdf', 'extract', 'select pages', 'export pages'], 
    isPro: false 
  },
  { 
    id: 'pdf-layout-tool', 
    name: 'PDF Layout (N-up Tool)', 
    description: 'Arrange multiple PDF pages per sheet (1-up, 2-up, 4-up, 6-up, 8-up) for thermal and paper saving.', 
    category: 'pdf', 
    icon: 'Layout', 
    path: '/tools/pdf-layout-tool', 
    keywords: ['pdf', 'layout', 'n-up', '2-up', '4-up', 'multi page sheet', 'thermal print', 'grid print'], 
    isPro: false 
  },
  { 
    id: 'pdf-compressor', 
    name: 'PDF Compressor', 
    description: 'Reduce PDF file size locally in your browser for marketplace portal upload guidelines.', 
    category: 'pdf', 
    icon: 'Minimize', 
    path: '/tools/pdf-compressor', 
    keywords: ['pdf', 'compress', 'reduce size', 'optimize pdf', 'shrink'], 
    isPro: false 
  },
  { 
    id: 'pdf-rotator', 
    name: 'PDF Rotator', 
    description: 'Rotate PDF pages by 90, 180, or 270 degrees to correct orientation.', 
    category: 'pdf', 
    icon: 'RotateCw', 
    path: '/tools/pdf-rotator', 
    keywords: ['pdf', 'rotate', 'orient', 'landscape to portrait', 'turn'], 
    isPro: false 
  },
  { 
    id: 'pdf-page-reorder', 
    name: 'PDF Page Reorder', 
    description: 'Drag and re-sequence PDF pages into any custom sequence before exporting.', 
    category: 'pdf', 
    icon: 'ListOrdered', 
    path: '/tools/pdf-page-reorder', 
    keywords: ['pdf', 'reorder', 'sort pages', 'sequence', 'move pages'], 
    isPro: false 
  },
  { 
    id: 'pdf-to-image', 
    name: 'PDF to Image', 
    description: 'Convert PDF document pages into high-resolution JPG or PNG images.', 
    category: 'pdf', 
    icon: 'Image', 
    path: '/tools/pdf-to-image', 
    keywords: ['pdf', 'pdf to image', 'pdf to png', 'pdf to jpg', 'convert'], 
    isPro: false 
  },
  { 
    id: 'image-to-pdf', 
    name: 'Image to PDF', 
    description: 'Convert multiple product photos and documents into a clean printable PDF.', 
    category: 'pdf', 
    icon: 'FileText', 
    path: '/tools/image-to-pdf', 
    keywords: ['image', 'image to pdf', 'jpg to pdf', 'png to pdf', 'convert to pdf'], 
    isPro: false 
  },

  // IMAGE TOOLS
  { 
    id: 'image-compressor', 
    name: 'Image Compressor', 
    description: 'Compress JPG, PNG, and WebP product photos locally with quality and dimension controls.', 
    category: 'image', 
    icon: 'Minimize', 
    path: '/tools/image-compressor', 
    keywords: ['image', 'compress', 'reduce image size', 'optimize image', 'batch zip'], 
    isPro: false 
  },
  { 
    id: 'image-resizer', 
    name: 'Image Resizer', 
    description: 'Resize single or batch product images with exact dimensions or aspect ratio preservation.', 
    category: 'image', 
    icon: 'Maximize', 
    path: '/tools/image-resizer', 
    keywords: ['image', 'resize', 'dimensions', 'batch resize', 'aspect ratio'], 
    isPro: false 
  },
  { 
    id: 'jpg-to-png', 
    name: 'JPG to PNG', 
    description: 'Convert JPEG/JPG images to lossless PNG format in your browser.', 
    category: 'image', 
    icon: 'ImageIcon', 
    path: '/tools/jpg-to-png', 
    keywords: ['image', 'jpg', 'jpeg', 'png', 'convert jpg to png'], 
    isPro: false 
  },
  { 
    id: 'png-to-jpg', 
    name: 'PNG to JPG', 
    description: 'Convert PNG images to lightweight JPG format with custom background fill.', 
    category: 'image', 
    icon: 'ImageIcon', 
    path: '/tools/png-to-jpg', 
    keywords: ['image', 'png', 'jpg', 'jpeg', 'convert png to jpg'], 
    isPro: false 
  },
  { 
    id: 'webp-converter', 
    name: 'WebP Converter', 
    description: 'Convert standard images to next-gen WebP format for blazing-fast eCommerce website loading.', 
    category: 'image', 
    icon: 'ImageIcon', 
    path: '/tools/webp-converter', 
    keywords: ['image', 'webp', 'convert to webp', 'next-gen image'], 
    isPro: false 
  },
  { 
    id: 'image-cropper', 
    name: 'Image Cropper', 
    description: 'Crop product photos to square, 4:5, 16:9, or custom seller marketplace ratios.', 
    category: 'image', 
    icon: 'Crop', 
    path: '/tools/image-cropper', 
    keywords: ['image', 'crop', 'square crop', 'product photo crop'], 
    isPro: false 
  },
  { 
    id: 'image-background', 
    name: 'Image Background Utility', 
    description: 'Add clean white, solid colored, or padded canvas backgrounds behind product images.', 
    category: 'image', 
    icon: 'Square', 
    path: '/tools/image-background', 
    keywords: ['image', 'background', 'white background', 'product canvas', 'padding'], 
    isPro: false 
  },
  { 
    id: 'product-image-formatter', 
    name: 'Product Image Formatter', 
    description: 'Format product photos to square marketplace guidelines (Amazon 1000x1000, Flipkart, Instagram).', 
    category: 'image', 
    icon: 'Layout', 
    path: '/tools/product-image-formatter', 
    keywords: ['image', 'format', 'marketplace product', 'square product', 'instagram product', 'a4 sheet'], 
    isPro: false 
  },
  { 
    id: 'product-image-batch-resizer', 
    name: 'Batch Product Resizer', 
    description: 'Resize dozens of product photos simultaneously and download all results in a single ZIP file.', 
    category: 'image', 
    icon: 'Layers', 
    path: '/tools/product-image-batch-resizer', 
    keywords: ['image', 'batch', 'bulk resize', 'zip download', 'catalog images'], 
    isPro: false 
  },

  // SELLER UTILITIES
  { 
    id: 'sku-generator', 
    name: 'SKU Generator', 
    description: 'Build systematic product SKUs with prefix, category, color, size, and sequential numbering.', 
    category: 'seller', 
    icon: 'Hash', 
    path: '/tools/sku-generator', 
    keywords: ['sku', 'generator', 'inventory code', 'product identifier', 'sku maker'], 
    isPro: false 
  },
  { 
    id: 'qr-code-generator', 
    name: 'QR Code Generator', 
    description: 'Generate high-resolution vector SVG and PNG QR codes for UPI payments, WhatsApp, URLs, and Wi-Fi.', 
    category: 'seller', 
    icon: 'QrCode', 
    path: '/tools/qr-code-generator', 
    keywords: ['qr', 'code', 'upi qr', 'whatsapp qr', 'payment qr', 'svg qr', 'png qr'], 
    isPro: false 
  },
  { 
    id: 'barcode-generator', 
    name: 'Barcode Generator', 
    description: 'Generate Code 128, EAN-13, EAN-8, and UPC-A standard barcodes with input validation and SVG/PNG download.', 
    category: 'seller', 
    icon: 'Barcode', 
    path: '/tools/barcode-generator', 
    keywords: ['barcode', 'code 128', 'ean-13', 'ean 13', 'upc', 'upc-a', 'barcode maker'], 
    isPro: false 
  },
  { 
    id: 'product-label-generator', 
    name: 'Product Label Generator', 
    description: 'Create and print product retail labels and thermal 4x6 labels with embedded barcode and QR code.', 
    category: 'seller', 
    icon: 'Tag', 
    path: '/tools/product-label-generator', 
    keywords: ['label', 'print', 'product label', 'thermal label', '4x6 label', 'barcode label', 'qr label'], 
    isPro: false 
  },
  { 
    id: 'shipping-label-formatter', 
    name: 'Shipping Label Formatter', 
    description: 'Format, align, and print customer package shipping slips with address cards.', 
    category: 'seller', 
    icon: 'Truck', 
    path: '/tools/shipping-label-formatter', 
    keywords: ['shipping', 'label', 'shipping label', 'dispatch slip', 'delivery label'], 
    isPro: false 
  },
  { 
    id: 'invoice-generator', 
    name: 'GST Invoice Generator', 
    description: 'Draft GST-ready commercial invoices with custom tax calculation, PDF export, and local templates.', 
    category: 'seller', 
    icon: 'FileText', 
    path: '/tools/invoice-generator', 
    keywords: ['invoice', 'billing', 'gst invoice', 'tax invoice', 'pdf invoice', 'bill maker'], 
    isPro: false 
  },
  { 
    id: 'product-title-generator', 
    name: 'Product Title Generator', 
    description: 'Generate high-ranking SEO product titles according to Amazon, Flipkart, and Meesho title formulas.', 
    category: 'seller', 
    icon: 'Type', 
    path: '/tools/product-title-generator', 
    keywords: ['title', 'seo', 'product title', 'listing title', 'amazon title'], 
    isPro: false 
  },
  { 
    id: 'product-description-generator', 
    name: 'Product Description Generator', 
    description: 'Draft compelling, structured product descriptions and bullet points for customer listings.', 
    category: 'seller', 
    icon: 'AlignLeft', 
    path: '/tools/product-description-generator', 
    keywords: ['description', 'product description', 'listing copy', 'bullet points'], 
    isPro: false 
  },
  { 
    id: 'product-keyword-generator', 
    name: 'Product Keyword Generator', 
    description: 'Generate backend search terms and high-volume tags to boost marketplace discovery.', 
    category: 'seller', 
    icon: 'Search', 
    path: '/tools/product-keyword-generator', 
    keywords: ['keyword', 'search terms', 'tags', 'seo keywords', 'backend search'], 
    isPro: false 
  },
  { 
    id: 'hsn-helper', 
    name: 'HSN Code & GST Helper', 
    description: 'Search common Harmonized System of Nomenclature (HSN) codes and their applicable GST tax rates.', 
    category: 'seller', 
    icon: 'Info', 
    path: '/tools/hsn-helper', 
    keywords: ['hsn', 'gst', 'hsn code', 'tax rate', 'sac code', 'gst rates'], 
    isPro: false 
  },
  { 
    id: 'csv-formatter', 
    name: 'CSV Formatter', 
    description: 'Upload, inspect, reorder, and edit CSV columns in a spreadsheet-like browser table.', 
    category: 'csv', 
    icon: 'Table', 
    path: '/tools/csv-formatter', 
    keywords: ['csv', 'format', 'csv editor', 'table', 'columns', 'spreadsheet'], 
    isPro: false 
  },
  { 
    id: 'csv-cleaner', 
    name: 'CSV Cleaner & Deduplicator', 
    description: 'Remove blank lines, trim extra spaces, and eliminate duplicate product rows from CSV files.', 
    category: 'csv', 
    icon: 'Trash', 
    path: '/tools/csv-cleaner', 
    keywords: ['csv', 'clean', 'deduplicate', 'remove duplicates', 'trim spaces'], 
    isPro: false 
  },
  { 
    id: 'bulk-product-data-formatter', 
    name: 'Bulk Product Data Formatter', 
    description: 'Format batch product listings, standardize titles, and clean catalog pricing columns.', 
    category: 'csv', 
    icon: 'Database', 
    path: '/tools/bulk-product-data-formatter', 
    keywords: ['bulk', 'data', 'catalog formatter', 'product data', 'bulk clean'], 
    isPro: false 
  },

  // AI
  { 
    id: 'ai-product-tools', 
    name: 'AI Product Content Optimizer', 
    description: 'Private, multi-provider AI assistant for product titles, bullet points, descriptions, and backend keywords.', 
    category: 'ai', 
    icon: 'Wand2', 
    path: '/tools/ai-product-tools', 
    keywords: ['ai', 'generator', 'openai', 'gemini', 'openrouter', 'ollama', 'copywriting', 'listing optimizer'], 
    isPro: false 
  },
];

export const getAllTools = (): Tool[] => tools;

export const getToolsByCategory = (category: ToolCategory): Tool[] => 
  tools.filter(tool => tool.category === category);

export const getToolById = (id: string): Tool | undefined => 
  tools.find(tool => tool.id === id);

export const searchTools = (query: string): Tool[] => {
  const lowercaseQuery = query.toLowerCase().trim();
  if (!lowercaseQuery) return tools;

  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.category.toLowerCase().includes(lowercaseQuery) ||
    tool.keywords.some(kw => kw.toLowerCase().includes(lowercaseQuery))
  );
};
