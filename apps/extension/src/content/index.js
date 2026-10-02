// MONTY GENIUS SELLER ASSISTANT — Content Script Engine

console.log('[MONTY GENIUS] Seller Assistant content engine active.');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'PING') {
    sendResponse({ status: 'PONG', url: window.location.href });
    return true;
  }

  if (request.action === 'TEST_SELECTOR') {
    try {
      const el = document.querySelector(request.selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const origOutline = el.style.outline;
        const origBoxShadow = el.style.boxShadow;
        el.style.outline = '3px solid #10b981';
        el.style.boxShadow = '0 0 12px rgba(16, 185, 129, 0.8)';
        setTimeout(() => {
          el.style.outline = origOutline;
          el.style.boxShadow = origBoxShadow;
        }, 3000);
        sendResponse({ success: true, count: 1 });
      } else {
        sendResponse({ success: false, message: 'No element found matching selector' });
      }
    } catch (err) {
      sendResponse({ success: false, message: err.message });
    }
    return true;
  }

  if (request.action === 'CAPTURE_PAGE_PRODUCT') {
    const mappings = request.mappings || [];
    const captured = {};
    for (const m of mappings) {
      if (!m.enabled) continue;
      try {
        const el = document.querySelector(m.selector);
        if (el && el.value) {
          captured[m.field] = el.value.trim();
        }
      } catch (e) {
        // Ignore invalid selectors during capture
      }
    }
    sendResponse({ success: true, captured });
    return true;
  }

  if (request.action === 'AUTOFILL_FORM') {
    const { product, mappings } = request;
    const currentUrl = window.location.href;
    const results = { filled: 0, fields: [], errors: [] };

    // Dispatches events smoothly
    const fill = (el, val) => {
      if (!el || val === undefined || val === null) return false;
      el.focus();
      if (el.tagName === 'SELECT') {
        let found = false;
        const strVal = String(val).toLowerCase();
        for (let i = 0; i < el.options.length; i++) {
          if (el.options[i].value.toLowerCase() === strVal || el.options[i].text.toLowerCase().includes(strVal)) {
            el.selectedIndex = i;
            found = true;
            break;
          }
        }
        if (!found && el.options.length > 1) el.selectedIndex = 1;
      } else {
        const prototype = el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
        const nativeSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
        if (nativeSetter) {
          nativeSetter.call(el, String(val));
        } else {
          el.value = String(val);
        }
      }

      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('blur', { bubbles: true }));
      return true;
    };

    if (Array.isArray(mappings)) {
      for (const item of mappings) {
        if (!item.enabled) continue;
        const val = product[item.field];
        if (val === undefined || val === null || val === '') continue;

        try {
          const el = document.querySelector(item.selector);
          if (el) {
            const ok = fill(el, val);
            if (ok) {
              results.filled++;
              results.fields.push(item.field);
            }
          }
        } catch (err) {
          results.errors.push({ field: item.field, error: err.message });
        }
      }
    }

    sendResponse({ success: true, results });
    return true;
  }
});
