// MONTY GENIUS SELLER ASSISTANT — Storage Schema & Defaults

export const SCHEMA_VERSION = 1;

export const DEFAULT_MAPPINGS = [
  { field: 'title', label: 'Product Title', selector: 'input[name="title"], input[placeholder*="Title" i], input[id*="title" i], textarea[name*="title" i]', enabled: true },
  { field: 'sku', label: 'SKU / Inventory Code', selector: 'input[name="sku"], input[placeholder*="SKU" i], input[id*="sku" i]', enabled: true },
  { field: 'price', label: 'Selling Price (₹)', selector: 'input[name="price"], input[name="selling_price"], input[placeholder*="Price" i], input[id*="price" i]', enabled: true },
  { field: 'mrp', label: 'MRP (₹)', selector: 'input[name="mrp"], input[placeholder*="MRP" i], input[id*="mrp" i]', enabled: true },
  { field: 'hsn', label: 'HSN / SAC Code', selector: 'input[name="hsn"], input[placeholder*="HSN" i], input[id*="hsn" i]', enabled: true },
  { field: 'gst', label: 'GST Rate (%)', selector: 'input[name="gst"], select[name="gst_rate"], select[name="tax_rate"]', enabled: true },
  { field: 'brand', label: 'Brand Name', selector: 'input[name="brand"], input[placeholder*="Brand" i], input[id*="brand" i]', enabled: true },
  { field: 'color', label: 'Color', selector: 'input[name="color"], input[placeholder*="Color" i], input[id*="color" i]', enabled: true },
  { field: 'size', label: 'Size', selector: 'input[name="size"], input[placeholder*="Size" i], input[id*="size" i]', enabled: true },
  { field: 'material', label: 'Fabric / Material', selector: 'input[name="material"], input[placeholder*="Material" i], input[id*="material" i]', enabled: true },
  { field: 'weight', label: 'Weight (kg)', selector: 'input[name="weight"], input[placeholder*="Weight" i], input[id*="weight" i]', enabled: true },
  { field: 'description', label: 'Description', selector: 'textarea[name="description"], textarea[placeholder*="Description" i], #description, .ql-editor', enabled: true },
];

export const SAMPLE_PRODUCT = {
  id: 'sample-001',
  title: 'Premium Cotton Regular Fit T-Shirt',
  description: '100% breathable combed cotton t-shirt with reinforced double-stitch crew neck. Ideal for all-day comfort and casual daily wear.',
  sku: 'MG-TSHIRT-BLK-01',
  price: 499,
  mrp: 999,
  hsn: '6109',
  gst: 18,
  brand: 'Monty Genius',
  color: 'Black',
  size: 'L',
  material: '100% Cotton',
  weight: '0.25',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
