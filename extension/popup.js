/**
 * MONTY GENIUS SELLER ASSISTANT - Popup Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
  const currentDomainEl = document.getElementById('currentDomain');
  const productSelect = document.getElementById('productSelect');
  const productSummary = document.getElementById('productSummary');
  const sumTitle = document.getElementById('sumTitle');
  const sumSku = document.getElementById('sumSku');
  const sumPrice = document.getElementById('sumPrice');
  const btnAutofill = document.getElementById('btnAutofill');
  const btnSaveCurrent = document.getElementById('btnSaveCurrent');
  const btnOptions = document.getElementById('btnOptions');
  const btnOpenWeb = document.getElementById('btnOpenWeb');
  const statusMsg = document.getElementById('statusMsg');

  let activeTab = null;
  let allProducts = [];
  let allMappings = [];

  // Show status helper
  function showStatus(text, isError = false) {
    statusMsg.textContent = text;
    statusMsg.className = 'status-msg ' + (isError ? 'status-error' : 'status-success');
    setTimeout(() => {
      statusMsg.textContent = '';
      statusMsg.className = 'status-msg';
    }, 3000);
  }

  // Get current active tab
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs && tabs[0]) {
      activeTab = tabs[0];
      const url = new URL(activeTab.url);
      currentDomainEl.textContent = url.hostname;
    }
  } catch (e) {
    currentDomainEl.textContent = 'Active Portal';
  }

  // Load products and mappings from storage
  function loadStorageData() {
    chrome.storage.local.get(['products', 'mappings'], (data) => {
      allProducts = data.products || [];
      allMappings = data.mappings || [];

      // Populate dropdown
      productSelect.innerHTML = '<option value="">-- Choose a Product --</option>';
      allProducts.forEach(prod => {
        const opt = document.createElement('option');
        opt.value = prod.id;
        opt.textContent = `${prod.title} (${prod.sku || 'No SKU'})`;
        productSelect.appendChild(opt);
      });

      if (allProducts.length > 0) {
        productSelect.value = allProducts[0].id;
        renderSelectedProduct(allProducts[0]);
      }
    });
  }

  function renderSelectedProduct(prod) {
    if (!prod) {
      productSummary.classList.add('hidden');
      btnAutofill.disabled = true;
      return;
    }
    sumTitle.textContent = prod.title || '-';
    sumSku.textContent = prod.sku || '-';
    sumPrice.textContent = prod.price ? `₹${prod.price}` : '-';
    productSummary.classList.remove('hidden');
    btnAutofill.disabled = false;
  }

  productSelect.addEventListener('change', () => {
    const selectedId = productSelect.value;
    const prod = allProducts.find(p => p.id === selectedId);
    renderSelectedProduct(prod);
  });

  // Autofill button click
  btnAutofill.addEventListener('click', () => {
    const selectedId = productSelect.value;
    const prod = allProducts.find(p => p.id === selectedId);
    if (!prod || !activeTab) return;

    btnAutofill.disabled = true;
    btnAutofill.textContent = '⏳ Autofilling...';

    chrome.tabs.sendMessage(activeTab.id, {
      action: 'autofill',
      product: prod,
      mappings: allMappings
    }, (response) => {
      btnAutofill.disabled = false;
      btnAutofill.textContent = '⚡ Autofill Active Form';

      if (chrome.runtime.lastError) {
        showStatus('Could not communicate with page. Please refresh the page.', true);
        return;
      }

      if (response && response.success) {
        showStatus(`Successfully filled ${response.count} fields!`);
      } else {
        showStatus('No matching fields detected with current selectors.', true);
      }
    });
  });

  // Save current product from active page
  btnSaveCurrent.addEventListener('click', () => {
    if (!activeTab) return;

    chrome.tabs.sendMessage(activeTab.id, {
      action: 'captureCurrentProduct',
      mappings: allMappings
    }, (response) => {
      if (chrome.runtime.lastError || !response || !response.success) {
        showStatus('Could not capture page fields. Check your selector mappings.', true);
        return;
      }

      const captured = response.product;
      const newProd = {
        id: 'prod_' + Date.now(),
        title: captured.title || 'Captured Product',
        description: captured.description || '',
        sku: captured.sku || 'SKU-' + Math.floor(Math.random() * 1000),
        price: captured.price || '0',
        mrp: captured.mrp || '0',
        hsn: captured.hsn || '',
        gst: captured.gst || '18',
        brand: captured.brand || '',
        color: captured.color || '',
        size: captured.size || '',
        material: captured.material || '',
        weight: captured.weight || ''
      };

      allProducts.push(newProd);
      chrome.storage.local.set({ products: allProducts }, () => {
        showStatus('Product saved successfully!');
        loadStorageData();
      });
    });
  });

  // Options page
  btnOptions.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  // Open web app
  btnOpenWeb.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:5173' });
  });

  loadStorageData();
});
