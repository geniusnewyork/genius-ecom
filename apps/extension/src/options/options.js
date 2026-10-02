// MONTY GENIUS SELLER ASSISTANT — Options Logic

import {
  getProducts,
  saveProduct,
  deleteProduct,
  duplicateProduct,
  exportProductsJSON,
  exportProductsCSV,
  importProducts,
  searchProducts,
} from '../storage/productStore.js';
import { getMappings, saveMappings, resetMappings } from '../storage/mappingStore.js';
import { getLicenseState, clearLicenseState } from '../storage/licenseStore.js';
import { getOrCreateDeviceIdentifier } from '../services/device.js';
import { deactivateDevice } from '../license/licenseClient.js';

let currentMappings = [];

document.addEventListener('DOMContentLoaded', async () => {
  setupTabs();
  await loadMappingsTable();
  await loadProductsCatalog();
  await loadLicenseInfo();
  setupCatalogHandlers();
});

function setupTabs() {
  const tabMappingsBtn = document.getElementById('tabMappingsBtn');
  const tabCatalogBtn = document.getElementById('tabCatalogBtn');
  const tabLicenseBtn = document.getElementById('tabLicenseBtn');

  const tabMappingsContent = document.getElementById('tabMappingsContent');
  const tabCatalogContent = document.getElementById('tabCatalogContent');
  const tabLicenseContent = document.getElementById('tabLicenseContent');

  function switchTab(activeBtn, activeContent) {
    [tabMappingsBtn, tabCatalogBtn, tabLicenseBtn].forEach((b) => b.classList.remove('active'));
    [tabMappingsContent, tabCatalogContent, tabLicenseContent].forEach((c) => c.classList.add('hidden'));

    activeBtn.classList.add('active');
    activeContent.classList.remove('hidden');
  }

  tabMappingsBtn.addEventListener('click', () => switchTab(tabMappingsBtn, tabMappingsContent));
  tabCatalogBtn.addEventListener('click', () => switchTab(tabCatalogBtn, tabCatalogContent));
  tabLicenseBtn.addEventListener('click', () => switchTab(tabLicenseBtn, tabLicenseContent));
}

// =================== TAB 1: MAPPINGS ===================

async function loadMappingsTable() {
  currentMappings = await getMappings();
  const tbody = document.getElementById('mappingsTableBody');
  tbody.innerHTML = '';

  currentMappings.forEach((m, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align: center;">
        <input type="checkbox" data-idx="${idx}" class="mapping-enable" ${m.enabled ? 'checked' : ''}>
      </td>
      <td>
        <strong style="color: #38bdf8;">${m.label || m.field}</strong>
        <div style="font-size: 11px; color: #64748b;">${m.field}</div>
      </td>
      <td>
        <input type="text" data-idx="${idx}" class="mapping-selector" value="${m.selector || ''}" style="font-family: monospace; font-size: 12px;">
      </td>
      <td>
        <button class="btn btn-secondary btn-sm btn-test-match" data-idx="${idx}">
          🔍 Test Match
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.btn-test-match').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const idx = e.currentTarget.getAttribute('data-idx');
      const selector = currentMappings[idx].selector;
      await testSelectorOnActiveTab(selector, e.currentTarget);
    });
  });

  document.querySelectorAll('.mapping-enable').forEach((chk) => {
    chk.addEventListener('change', (e) => {
      const idx = e.target.getAttribute('data-idx');
      currentMappings[idx].enabled = e.target.checked;
    });
  });

  document.querySelectorAll('.mapping-selector').forEach((inp) => {
    inp.addEventListener('input', (e) => {
      const idx = e.target.getAttribute('data-idx');
      currentMappings[idx].selector = e.target.value.trim();
    });
  });
}

async function testSelectorOnActiveTab(selector, btnEl) {
  const origText = btnEl.textContent;
  btnEl.textContent = 'Testing...';

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) {
      alert('No active webpage tab found to test.');
      btnEl.textContent = origText;
      return;
    }

    chrome.tabs.sendMessage(tab.id, { action: 'TEST_SELECTOR', selector }, (response) => {
      btnEl.textContent = origText;
      if (chrome.runtime.lastError) {
        alert('Could not test selector on this tab. Refresh your seller portal page and try again.');
        return;
      }
      if (response && response.success) {
        alert(`✅ Element found! It has been outlined in glowing green on "${tab.title}".`);
      } else {
        alert(`❌ No matching element found on the active page for: ${selector}`);
      }
    });
  } catch (err) {
    btnEl.textContent = origText;
    alert('Error testing selector: ' + err.message);
  }
}

document.getElementById('btnSaveMappings').addEventListener('click', async () => {
  await saveMappings(currentMappings);
  const statusEl = document.getElementById('mappingStatus');
  statusEl.textContent = '✅ All mappings saved successfully!';
  setTimeout(() => (statusEl.textContent = ''), 3500);
});

document.getElementById('btnResetMappings').addEventListener('click', async () => {
  if (confirm('Reset all selector mappings back to original defaults?')) {
    currentMappings = await resetMappings();
    await loadMappingsTable();
  }
});

// =================== TAB 2: PRODUCT CATALOG ===================

async function loadProductsCatalog(searchQuery = '') {
  const products = searchQuery ? await searchProducts(searchQuery) : await getProducts();
  document.getElementById('prodCount').textContent = products.length;
  const listEl = document.getElementById('productList');
  listEl.innerHTML = '';

  if (products.length === 0) {
    listEl.innerHTML = '<div style="color: #64748b; padding: 20px; text-align: center;">No products in catalog. Add your first product above.</div>';
    return;
  }

  products.forEach((p) => {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.innerHTML = `
      <div class="product-info">
        <h4>${p.title}</h4>
        <div class="product-meta">
          <span>SKU: <strong style="color:#e2e8f0;">${p.sku}</strong></span> • 
          <span>Price: <strong style="color:#38bdf8;">₹${p.price}</strong></span> • 
          <span>MRP: ₹${p.mrp || '-'}</span> • 
          <span>HSN: ${p.hsn || '-'}</span>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn-secondary btn-sm btn-edit-prod" data-id="${p.id}">✏️ Edit</button>
        <button class="btn btn-secondary btn-sm btn-dup-prod" data-id="${p.id}">📄 Copy</button>
        <button class="btn btn-danger btn-sm btn-del-prod" data-id="${p.id}">🗑️</button>
      </div>
    `;
    listEl.appendChild(div);
  });

  // Action listeners
  document.querySelectorAll('.btn-edit-prod').forEach((b) => {
    b.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const products = await getProducts();
      const p = products.find((prod) => prod.id === id);
      if (p) populateEditForm(p);
    });
  });

  document.querySelectorAll('.btn-dup-prod').forEach((b) => {
    b.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      await duplicateProduct(id);
      await loadProductsCatalog();
    });
  });

  document.querySelectorAll('.btn-del-prod').forEach((b) => {
    b.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      if (confirm('Delete this product from your catalog?')) {
        await deleteProduct(id);
        await loadProductsCatalog();
      }
    });
  });
}

function populateEditForm(p) {
  document.getElementById('editProductId').value = p.id;
  document.getElementById('newTitle').value = p.title || '';
  document.getElementById('newSku').value = p.sku || '';
  document.getElementById('newPrice').value = p.price || '';
  document.getElementById('newMrp').value = p.mrp || '';
  document.getElementById('newGst').value = p.gst || '18';
  document.getElementById('newBrand').value = p.brand || '';
  document.getElementById('newHsn').value = p.hsn || '';
  document.getElementById('newWeight').value = p.weight || '';
  document.getElementById('newColor').value = p.color || '';
  document.getElementById('newSize').value = p.size || '';
  document.getElementById('newMaterial').value = p.material || '';
  document.getElementById('newDesc').value = p.description || '';

  document.getElementById('btnAddProduct').textContent = '💾 Update Product';
  document.getElementById('btnCancelEdit').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetProductForm() {
  document.getElementById('editProductId').value = '';
  document.getElementById('newTitle').value = '';
  document.getElementById('newSku').value = '';
  document.getElementById('newPrice').value = '';
  document.getElementById('newMrp').value = '';
  document.getElementById('newGst').value = '18';
  document.getElementById('newBrand').value = '';
  document.getElementById('newHsn').value = '';
  document.getElementById('newWeight').value = '';
  document.getElementById('newColor').value = '';
  document.getElementById('newSize').value = '';
  document.getElementById('newMaterial').value = '';
  document.getElementById('newDesc').value = '';

  document.getElementById('btnAddProduct').textContent = '➕ Save Product Profile';
  document.getElementById('btnCancelEdit').classList.add('hidden');
}

function setupCatalogHandlers() {
  document.getElementById('btnAddProduct').addEventListener('click', async () => {
    const title = document.getElementById('newTitle').value.trim();
    const sku = document.getElementById('newSku').value.trim();
    const price = Number(document.getElementById('newPrice').value);

    if (!title || !sku || isNaN(price)) {
      alert('Please provide Title, SKU, and Selling Price.');
      return;
    }

    const id = document.getElementById('editProductId').value || null;
    const prod = {
      id: id || undefined,
      title,
      sku,
      price,
      mrp: Number(document.getElementById('newMrp').value) || 0,
      gst: Number(document.getElementById('newGst').value) || 18,
      brand: document.getElementById('newBrand').value.trim(),
      hsn: document.getElementById('newHsn').value.trim(),
      weight: document.getElementById('newWeight').value.trim(),
      color: document.getElementById('newColor').value.trim(),
      size: document.getElementById('newSize').value.trim(),
      material: document.getElementById('newMaterial').value.trim(),
      description: document.getElementById('newDesc').value.trim(),
    };

    await saveProduct(prod);
    resetProductForm();
    await loadProductsCatalog();
  });

  document.getElementById('btnCancelEdit').addEventListener('click', resetProductForm);

  document.getElementById('searchProductsInput').addEventListener('input', (e) => {
    loadProductsCatalog(e.target.value);
  });

  // Export JSON
  document.getElementById('btnExportJSON').addEventListener('click', async () => {
    const jsonStr = await exportProductsJSON();
    downloadFile(jsonStr, 'monty_genius_catalog.json', 'application/json');
  });

  // Export CSV
  document.getElementById('btnExportCSV').addEventListener('click', async () => {
    const csvStr = await exportProductsCSV();
    downloadFile(csvStr, 'monty_genius_catalog.csv', 'text/csv');
  });

  // Import File
  document.getElementById('importFileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const format = file.name.endsWith('.csv') ? 'csv' : 'json';
    reader.onload = async (evt) => {
      try {
        const count = await importProducts(evt.target.result, format);
        alert(`Successfully imported ${count} products into catalog!`);
        await loadProductsCatalog();
      } catch (err) {
        alert('Error importing file: ' + err.message);
      }
    };
    reader.readAsText(file);
  });
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// =================== TAB 3: LICENSE & DEVICES ===================

async function loadLicenseInfo() {
  const state = await getLicenseState();
  const deviceInfo = await getOrCreateDeviceIdentifier();

  document.getElementById('licPlan').textContent = state.isDevMode ? 'DEV FREE MODE (Owner)' : state.plan;
  document.getElementById('licStatus').textContent = state.isDevMode ? 'ACTIVE' : state.status;
  document.getElementById('licKey').textContent = state.licenseKey || 'MGDEV-DEVELOPMENT-BYPASS';
  document.getElementById('licExpiry').textContent = state.expiresAt
    ? new Date(state.expiresAt).toLocaleDateString()
    : 'Never (Lifetime Access)';

  document.getElementById('licDeviceId').textContent = deviceInfo.deviceIdentifier;
  document.getElementById('licDeviceName').textContent = deviceInfo.deviceName;

  document.getElementById('btnDeactivateDevice').addEventListener('click', async () => {
    if (confirm('Disconnect this device? This will free up this workstation seat on your license.')) {
      const res = await deactivateDevice();
      if (res.success) {
        alert('Device disconnected successfully.');
        await loadLicenseInfo();
      } else {
        alert('Failed: ' + res.message);
      }
    }
  });
}
