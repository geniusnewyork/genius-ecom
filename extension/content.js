/**
 * MONTY GENIUS SELLER ASSISTANT - Content Script
 * Responsible for safe form filling and element selector inspection.
 */

(function () {
  let isInspecting = false;
  let inspectTargetField = '';
  let inspectHoverElement = null;

  function generateSelector(el) {
    if (!el) return '';
    if (el.id) return `#${el.id}`;
    if (el.name) return `${el.tagName.toLowerCase()}[name="${el.name}"]`;
    if (el.placeholder) return `${el.tagName.toLowerCase()}[placeholder="${el.placeholder}"]`;
    
    // Class-based or hierarchy
    let path = [];
    while (el && el.nodeType === Node.ELEMENT_NODE) {
      let selector = el.nodeName.toLowerCase();
      if (el.className && typeof el.className === 'string') {
        const firstClass = el.className.trim().split(/\s+/)[0];
        if (firstClass) selector += '.' + firstClass;
      }
      path.unshift(selector);
      el = el.parentNode;
      if (path.length > 3) break;
    }
    return path.join(' > ');
  }

  // Safe setter that triggers React / Vue state updates
  function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else if (valueSetter) {
      valueSetter.call(element, value);
    } else {
      element.value = value;
    }

    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true }));
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'autofill') {
      const { product, mappings } = request;
      let filledCount = 0;

      mappings.forEach(m => {
        if (!m.enabled || !m.selector) return;
        const val = product[m.field];
        if (val === undefined || val === null || val === '') return;

        try {
          const els = document.querySelectorAll(m.selector);
          els.forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
              setNativeValue(el, val);
              // Visual flash highlight
              const originalBorder = el.style.border;
              el.style.border = '2px solid #06b6d4';
              setTimeout(() => { el.style.border = originalBorder; }, 1200);
              filledCount++;
            }
          });
        } catch (e) {
          console.warn('[MONTY GENIUS] Selector failed:', m.selector, e);
        }
      });

      sendResponse({ success: true, count: filledCount });
    }

    else if (request.action === 'testMapping') {
      const { selector } = request;
      try {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
          const original = el.style.outline;
          el.style.outline = '3px solid #10b981';
          setTimeout(() => { el.style.outline = original; }, 2000);
        });
        sendResponse({ success: true, matchCount: els.length });
      } catch (e) {
        sendResponse({ success: false, error: e.message });
      }
    }

    else if (request.action === 'startInspector') {
      inspectTargetField = request.field;
      isInspecting = true;
      document.body.style.cursor = 'crosshair';
      sendResponse({ status: 'started' });
    }

    else if (request.action === 'captureCurrentProduct') {
      const { mappings } = request;
      const captured = {};
      mappings.forEach(m => {
        if (!m.enabled || !m.selector) return;
        try {
          const el = document.querySelector(m.selector);
          if (el && (el.value !== undefined)) {
            captured[m.field] = el.value;
          }
        } catch (e) {
          console.warn('Capture failed for selector:', m.selector);
        }
      });
      sendResponse({ success: true, product: captured });
    }

    return true; // Asynchronous reply
  });

  // DOM Click Listener for element inspection
  document.addEventListener('click', (e) => {
    if (!isInspecting) return;
    e.preventDefault();
    e.stopPropagation();

    isInspecting = false;
    document.body.style.cursor = 'default';

    const target = e.target;
    const selector = generateSelector(target);

    chrome.runtime.sendMessage({
      action: 'fieldCaptured',
      field: inspectTargetField,
      selector: selector
    });

    // Provide visual confirmation
    target.style.outline = '3px solid #06b6d4';
    setTimeout(() => { target.style.outline = ''; }, 1500);
  }, true);

})();
