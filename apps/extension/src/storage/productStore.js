// MONTY GENIUS SELLER ASSISTANT — Product Storage Module

import { SAMPLE_PRODUCT } from './schema.js';

export async function getProducts() {
  const result = await chrome.storage.local.get(['products']);
  if (!result.products || !Array.isArray(result.products)) {
    const initial = [SAMPLE_PRODUCT];
    await chrome.storage.local.set({ products: initial });
    return initial;
  }
  return result.products;
}

export async function getProductById(id) {
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}

export async function saveProduct(product) {
  const products = await getProducts();
  const existingIndex = products.findIndex((p) => p.id === product.id);

  const updatedProduct = {
    ...product,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    products[existingIndex] = updatedProduct;
  } else {
    updatedProduct.id = updatedProduct.id || 'prod-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    updatedProduct.createdAt = new Date().toISOString();
    products.unshift(updatedProduct);
  }

  await chrome.storage.local.set({ products });
  return updatedProduct;
}

export async function deleteProduct(id) {
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  await chrome.storage.local.set({ products: filtered });
  return true;
}

export async function duplicateProduct(id) {
  const product = await getProductById(id);
  if (!product) return null;

  const duplicated = {
    ...product,
    id: 'prod-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    title: product.title + ' (Copy)',
    sku: product.sku + '-COPY',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const products = await getProducts();
  products.unshift(duplicated);
  await chrome.storage.local.set({ products });
  return duplicated;
}

export async function searchProducts(query) {
  const products = await getProducts();
  if (!query || query.trim() === '') return products;
  const q = query.toLowerCase().trim();
  return products.filter((p) =>
    (p.title && p.title.toLowerCase().includes(q)) ||
    (p.sku && p.sku.toLowerCase().includes(q)) ||
    (p.brand && p.brand.toLowerCase().includes(q)) ||
    (p.hsn && p.hsn.toLowerCase().includes(q))
  );
}

export async function exportProductsJSON() {
  const products = await getProducts();
  return JSON.stringify(products, null, 2);
}

export async function exportProductsCSV() {
  const products = await getProducts();
  if (!products.length) return '';

  const headers = ['id', 'title', 'sku', 'price', 'mrp', 'hsn', 'gst', 'brand', 'color', 'size', 'material', 'weight', 'description'];
  const rows = [headers.join(',')];

  for (const p of products) {
    const row = headers.map((h) => {
      const val = (p[h] !== undefined && p[h] !== null ? String(p[h]) : '').replace(/"/g, '""');
      return `"${val}"`;
    });
    rows.push(row.join(','));
  }

  return rows.join('\n');
}

export async function importProducts(data, format = 'json') {
  let newProducts = [];
  if (format === 'json') {
    newProducts = JSON.parse(data);
  } else {
    // Simple CSV parser
    const lines = data.trim().split('\n');
    if (lines.length <= 1) return 0;
    const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = cols[idx] || '';
      });
      if (obj.title && obj.sku) {
        obj.id = obj.id || 'prod-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        newProducts.push(obj);
      }
    }
  }

  if (Array.isArray(newProducts) && newProducts.length > 0) {
    const existing = await getProducts();
    const merged = [...newProducts, ...existing];
    await chrome.storage.local.set({ products: merged });
    return newProducts.length;
  }
  return 0;
}
