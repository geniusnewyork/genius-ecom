/**
 * MONTY GENIUS SELLER ASSISTANT - Options Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabMappingsBtn = document.getElementById('tabMappingsBtn');
  const tabCatalogBtn = document.getElementById('tabCatalogBtn');
  const tabMappingsContent = document.getElementById('tabMappingsContent');
  const tabCatalogContent = document.getElementById('tabCatalogContent');
  const mappingsTableBody = document.getElementById('mappingsTableBody');
  const btnSaveMappings = document.getElementById('btnSaveMappings');
  const mappingStatus = document.getElementById('mappingStatus');

  const btnAddProduct = document.getElementById('btnAddProduct');
  const productList = document.getElementById('productList');
  const prodCount = document.getElementById('prodCount');

  let mappings = [];
  let products = [];

  // Tabs
  tabMappingsBtn.addEventListener('click', () => {
    tabMappingsBtn.classList.add('active');
    tabCatalogBtn.classList.remove('active');
    tabMappingsContent.style.display = 'block';
    tabCatalogContent.style.display = 'none';
  });

  tabCatalogBtn.addEventListener('click', () => {
    tabCatalogBtn.classList.add('active');
    tabMappingsBtn.classList.remove('active');
    tabCatalogContent.style.display = 'block';
    tabMappingsContent.style.display = 'none';
  });

  // Load storage
  function loadData() {
    chrome.storage.local.get(['mappings', 'products'], (data) => {
      mappings = data.mappings || [];
      products = data.products || [];
      renderMappings();
      renderProducts();
    });
  }

  function renderMappings() {
    mappingsTableBody.innerHTML = '';
    mappings.forEach((m, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" id="enable_${idx}" ${m.enabled ? 'checked' : ''} style="cursor: pointer;">
        </td>
        <td style="font-weight: 600; text-transform: capitalize; color: #38bdf8;">
          ${m.field}
        </td>
        <td>
          <input type="text" id="selector_${idx}" value="${m.selector || ''}" placeholder="CSS Selector">
        </td>
        <td>
          <button class="btn btn-outline test-btn" data-index="${idx}" style="padding: 4px 8px; font-size: 11px;">
            Test Matching
          </button>
        </td>
      `;
      mappingsTableBody.appendChild(tr);
    });

    // Add listeners to test buttons
    document.querySelectorAll('.test-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        const selectorInput = document.getElementById(`selector_${index}`);
        testSelector(selectorInput.value);
      });
    });
  }

  function testSelector(selector) {
    if (!selector) {
      alert('Please enter a selector first.');
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || !tabs[0]) {
        alert('No active browser tab found to test on.');
        return;
      }
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'testMapping',
        selector: selector
      }, (res) => {
        if (chrome.runtime.lastError) {
          alert('Could not test on active tab. Make sure you have your marketplace seller page open in the current tab.');
          return;
        }
        if (res && res.success) {
          alert(`Success! Found ${res.matchCount} matching element(s) on the active page and highlighted them in green.`);
        } else {
          alert(`Selector error: ${res?.error || 'No elements found matching selector'}`);
        }
      });
    });
  }

  btnSaveMappings.addEventListener('click', () => {
    mappings.forEach((m, idx) => {
      const chk = document.getElementById(`enable_${idx}`);
      const sel = document.getElementById(`selector_${idx}`);
      m.enabled = chk.checked;
      m.selector = sel.value.trim();
    });

    chrome.storage.local.set({ mappings }, () => {
      mappingStatus.textContent = '✓ Mappings saved!';
      setTimeout(() => { mappingStatus.textContent = ''; }, 3000);
    });
  });

  // Product Catalog
  function renderProducts() {
    prodCount.textContent = products.length;
    productList.innerHTML = '';

    if (products.length === 0) {
      productList.innerHTML = '<p style="color: #64748b; font-style: italic;">No saved products yet. Add your first product above.</p>';
      return;
    }

    products.forEach((p, idx) => {
      const card = document.createElement('div');
      card.style.cssText = 'background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center;';
      card.innerHTML = `
        <div>
          <div style="font-weight: 700; color: #f8fafc; font-size: 14px;">${p.title}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">
            SKU: <strong style="color: #38bdf8;">${p.sku || '-'}</strong> | Price: ₹${p.price || '0'} | Brand: ${p.brand || '-'}
          </div>
        </div>
        <button class="btn btn-danger del-btn" data-index="${idx}" style="padding: 4px 8px; font-size: 11px;">
          Delete
        </button>
      `;
      productList.appendChild(card);
    });

    document.querySelectorAll('.del-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        if (confirm(`Delete "${products[index].title}"?`)) {
          products.splice(index, 1);
          chrome.storage.local.set({ products }, () => {
            renderProducts();
          });
        }
      });
    });
  }

  btnAddProduct.addEventListener('click', () => {
    const title = document.getElementById('newTitle').value.trim();
    if (!title) {
      alert('Product title is required.');
      return;
    }

    const newProd = {
      id: 'prod_' + Date.now(),
      title,
      sku: document.getElementById('newSku').value.trim(),
      price: document.getElementById('newPrice').value.trim(),
      mrp: document.getElementById('newMrp').value.trim(),
      gst: document.getElementById('newGst').value.trim(),
      brand: document.getElementById('newBrand').value.trim(),
      hsn: document.getElementById('newHsn').value.trim(),
      weight: document.getElementById('newWeight').value.trim(),
      color: document.getElementById('newColor').value.trim(),
      size: document.getElementById('newSize').value.trim(),
      material: document.getElementById('newMaterial').value.trim(),
      description: document.getElementById('newDesc').value.trim()
    };

    products.push(newProd);
    chrome.storage.local.set({ products }, () => {
      alert('Product added to catalog!');
      // Clear form
      ['newTitle', 'newSku', 'newPrice', 'newMrp', 'newGst', 'newBrand', 'newHsn', 'newWeight', 'newColor', 'newSize', 'newMaterial', 'newDesc'].forEach(id => {
        document.getElementById(id).value = '';
      });
      renderProducts();
    });
  });

  loadData();
});
