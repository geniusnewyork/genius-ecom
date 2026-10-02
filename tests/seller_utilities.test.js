import assert from 'node:assert/strict';

console.log('--- Testing Seller Utilities Logic ---');

// 1. SKU Generator
function generateSKU({ prefix, category, color, size, sequence }) {
  return [prefix, category, color, size, sequence].filter(Boolean).map(s => s.trim().toUpperCase()).join('-');
}

const sku1 = generateSKU({ prefix: 'MG', category: 'SHOE', color: 'BLK', size: '42', sequence: '001' });
assert.equal(sku1, 'MG-SHOE-BLK-42-001');

const sku2 = generateSKU({ prefix: 'MG', category: 'TSHIRT', color: '', size: 'XL', sequence: '105' });
assert.equal(sku2, 'MG-TSHIRT-XL-105');
console.log('✓ SKU Generator: Prefix and segment composition passed');

// 2. Barcode Validation
function validateBarcode(text, format) {
  if (!text || !text.trim()) return false;
  if (format === 'EAN13') return /^\d{12,13}$/.test(text);
  if (format === 'EAN8') return /^\d{7,8}$/.test(text);
  if (format === 'UPC') return /^\d{11,12}$/.test(text);
  if (format === 'CODE128') return text.length > 0;
  return false;
}

assert.equal(validateBarcode('8901234567890', 'EAN13'), true);
assert.equal(validateBarcode('890123456789', 'EAN13'), true);
assert.equal(validateBarcode('8901234', 'EAN13'), false); // Too short

assert.equal(validateBarcode('12345678', 'EAN8'), true);
assert.equal(validateBarcode('1234567', 'EAN8'), true);
assert.equal(validateBarcode('123456', 'EAN8'), false);

assert.equal(validateBarcode('012345678905', 'UPC'), true);
assert.equal(validateBarcode('01234567890', 'UPC'), true);
assert.equal(validateBarcode('01234', 'UPC'), false);

assert.equal(validateBarcode('MG-PRODUCT-123', 'CODE128'), true);
console.log('✓ Barcode Validator: EAN-13, EAN-8, UPC-A, and Code128 passed');

// 3. QR Code UPI & Wi-Fi formatters
function formatUpiPayload(vpa, name, amount) {
  return `upi://pay?pa=${encodeURIComponent(vpa)}&pn=${encodeURIComponent(name)}${amount ? `&am=${amount}` : ''}&cu=INR`;
}
const upiUri = formatUpiPayload('seller@okaxis', 'Monty Store', '499');
assert.equal(upiUri, 'upi://pay?pa=seller%40okaxis&pn=Monty%20Store&am=499&cu=INR');

function formatWifiPayload(ssid, type, pass) {
  return `WIFI:S:${ssid};T:${type};P:${pass};;`;
}
const wifiUri = formatWifiPayload('ShopNet', 'WPA', 'SecretPass');
assert.equal(wifiUri, 'WIFI:S:ShopNet;T:WPA;P:SecretPass;;');
console.log('✓ QR Code Formatter: UPI and Wi-Fi payload formatting passed');

// 4. CSV Cleaner & Deduplication
function cleanCSV(csvText) {
  const lines = csvText.split('\n');
  const seen = new Set();
  const cleaned = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line || line.split(',').every(cell => !cell.trim())) continue;
    line = line.replace(/\s+/g, ' ');
    if (seen.has(line) && i !== 0) continue;
    seen.add(line);
    cleaned.push(line);
  }
  return cleaned.join('\n');
}

const dirtyCSV = `SKU,Price,Name
MG-01, 100 , Shirt
  
MG-01, 100 , Shirt
MG-02, 200 , Pants`;

const cleanedResult = cleanCSV(dirtyCSV);
const cleanedLines = cleanedResult.split('\n');
assert.equal(cleanedLines.length, 3, 'Header + 2 unique products');
assert.equal(cleanedLines[0], 'SKU,Price,Name');
assert.equal(cleanedLines[1], 'MG-01, 100 , Shirt');
assert.equal(cleanedLines[2], 'MG-02, 200 , Pants');
console.log('✓ CSV Cleaner: De-duplication and empty row removal passed');

console.log('ALL SELLER UTILITIES TESTS PASSED SUCCESSFULLY! 🎉\n');
