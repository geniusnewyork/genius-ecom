// MONTY GENIUS SELLER ASSISTANT — Popup Logic

import { getProducts, saveProduct } from '../storage/productStore.js';
import { getMappings } from '../storage/mappingStore.js';
import { getLicenseState } from '../storage/licenseStore.js';
import { activateLicense, validateCurrentLicense } from '../license/licenseClient.js';

let activeProduct = null;
let activeTab = null;

document.addEventListener('DOMContentLoaded', async () => {
  await initLicenseStatus();
  await initActiveTab();
  await loadProducts();
  setupEventListeners();
});

async function initLicenseStatus() {
  const licenseState = await getLicenseState();
  const planBadge = document.getElementById('planBadge');
  const licenseDetail = document.getElementById('licenseDetail');
  const activationBox = document.getElementById('activationBox');
  const btnAutofill = document.getElementById('btnAutofill');

  if (licenseState.isDevMode) {
    planBadge.textContent = 'DEV FREE MODE';
    planBadge.className = 'badge badge-dev';
    licenseDetail.textContent = 'Full Access Active';
    activationBox.classList.add('hidden');
    return;
  }

  if (licenseState.isActivated && licenseState.status === 'ACTIVE') {
    planBadge.textContent = `${licenseState.plan} ACTIVE`;
    planBadge.className = 'badge badge-pro';
    licenseDetail.textContent = licenseState.expiresAt
      ? `Valid until ${licenseState.expiresAt.split('T')[0]}`
      : 'Lifetime License';
    activationBox.classList.add('hidden');
  } else {
    planBadge.textContent = 'ACTIVATION REQUIRED';
    planBadge.className = 'badge badge-free';
    licenseDetail.textContent = 'Enter Pro License';
    activationBox.classList.remove('hidden');
    btnAutofill.disabled = true;
  }
}

async function initActiveTab() {
  const domainEl = document.getElementById('currentDomain');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    activeTab = tab;
    if (tab && tab.url) {
      const url = new URL(tab.url);
      domainEl.textContent = url.hostname;
    } else {
      domainEl.textContent = 'No active page';
    }
  } catch (e) {
    domainEl.textContent = 'Active tab unavailable';
  }
}

async function loadProducts() {
  const select = document.getElementById('productSelect');
  const products = await getProducts();

  select.innerHTML = '<option value="">-- Choose a Product --</option>';
  products.forEach((p) => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.sku || 'SKU'} - ${p.title}`;
    select.appendChild(opt);
  });

  if (products.length > 0) {
    select.selectedIndex = 1;
    selectProduct(products[0]);
  }
}

function selectProduct(p) {
  activeProduct = p;
  const summary = document.getElementById('productSummary');
  const btnAutofill = document.getElementById('btnAutofill');

  if (!p) {
    summary.classList.add('hidden');
    btnAutofill.disabled = true;
    return;
  }

  document.getElementById('sumTitle').textContent = p.title || '-';
  document.getElementById('sumSku').textContent = p.sku || '-';
  document.getElementById('sumPrice').textContent = p.price ? `₹${p.price}` : '-';

  summary.classList.remove('hidden');

  // Check license before enabling button
  getLicenseState().then((state) => {
    if (state.isDevMode || (state.isActivated && state.status === 'ACTIVE')) {
      btnAutofill.disabled = false;
    }
  });
}

function setupEventListeners() {
  document.getElementById('productSelect').addEventListener('change', async (e) => {
    const products = await getProducts();
    const p = products.find((prod) => prod.id === e.target.value);
    selectProduct(p);
  });

  document.getElementById('btnOptions').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  document.getElementById('btnLicenseModal').addEventListener('click', () => {
    const box = document.getElementById('activationBox');
    box.classList.toggle('hidden');
  });

  document.getElementById('btnOpenWeb').addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:5173' });
  });

  // Activate button
  document.getElementById('btnActivate').addEventListener('click', async () => {
    const input = document.getElementById('licenseKeyInput');
    const errEl = document.getElementById('activationError');
    const key = input.value.trim().toUpperCase();

    if (!key) {
      errEl.textContent = 'Please enter a valid license key.';
      return;
    }

    errEl.textContent = 'Activating license...';
    const res = await activateLicense(key);

    if (res.success) {
      errEl.textContent = '';
      showStatus('License activated successfully!', 'success');
      await initLicenseStatus();
      if (activeProduct) {
        document.getElementById('btnAutofill').disabled = false;
      }
    } else {
      errEl.textContent = res.error?.message || 'Activation failed.';
    }
  });

  // Autofill button
  document.getElementById('btnAutofill').addEventListener('click', async () => {
    if (!activeProduct || !activeTab) return;

    showStatus('Filling active listing form...');
    const mappings = await getMappings();

    try {
      chrome.tabs.sendMessage(
        activeTab.id,
        {
          action: 'AUTOFILL_FORM',
          product: activeProduct,
          mappings,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            showStatus('Cannot connect to page. Refresh the seller page and retry.', 'error');
            return;
          }

          if (response && response.success) {
            const count = response.results.filled;
            if (count > 0) {
              showStatus(`✅ Successfully autofilled ${count} fields!`, 'success');
            } else {
              showStatus('⚠️ No matching input fields found on this page.', 'warn');
            }
          }
        }
      );
    } catch (e) {
      showStatus('Error communicating with active tab.', 'error');
    }
  });

  // Save current from page
  document.getElementById('btnSaveCurrent').addEventListener('click', async () => {
    if (!activeTab) return;
    showStatus('Capturing fields from page...');
    const mappings = await getMappings();

    chrome.tabs.sendMessage(
      activeTab.id,
      {
        action: 'CAPTURE_PAGE_PRODUCT',
        mappings,
      },
      async (response) => {
        if (chrome.runtime.lastError) {
          showStatus('Cannot capture from this tab.', 'error');
          return;
        }

        if (response && response.success && response.captured) {
          const cap = response.captured;
          if (Object.keys(cap).length === 0) {
            showStatus('No populated fields found to capture.', 'warn');
            return;
          }

          const newProd = {
            title: cap.title || 'Captured Product ' + new Date().toLocaleTimeString(),
            sku: cap.sku || 'CAP-' + Date.now().toString(36).toUpperCase(),
            price: Number(cap.price) || 0,
            mrp: Number(cap.mrp) || 0,
            hsn: cap.hsn || '',
            gst: Number(cap.gst) || 18,
            brand: cap.brand || '',
            color: cap.color || '',
            size: cap.size || '',
            material: cap.material || '',
            weight: cap.weight || '',
            description: cap.description || '',
          };

          const saved = await saveProduct(newProd);
          await loadProducts();
          selectProduct(saved);
          showStatus('✅ Product saved from page to catalog!', 'success');
        }
      }
    );
  });
}

function showStatus(msg, type = 'info') {
  const el = document.getElementById('statusMsg');
  el.textContent = msg;
  if (type === 'success') el.style.color = '#34d399';
  else if (type === 'error') el.style.color = '#f87171';
  else if (type === 'warn') el.style.color = '#fbbf24';
  else el.style.color = '#94a3b8';

  setTimeout(() => {
    if (el.textContent === msg) el.textContent = '';
  }, 4000);
}
