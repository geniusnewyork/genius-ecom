// MONTY GENIUS SELLER ASSISTANT — Base Marketplace Adapter

export class BaseMarketplaceAdapter {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  matches(url) {
    return false;
  }

  /**
   * Safely dispatches native input and change events to work with
   * React, Vue, Angular, and native HTML forms.
   */
  fillElement(el, value) {
    if (!el || value === undefined || value === null) return false;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.focus();

    if (el.tagName === 'SELECT') {
      let matched = false;
      const strVal = String(value).toLowerCase();
      for (let i = 0; i < el.options.length; i++) {
        const opt = el.options[i];
        if (
          opt.value.toLowerCase() === strVal ||
          opt.text.toLowerCase().includes(strVal)
        ) {
          el.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched && el.options.length > 1) {
        el.selectedIndex = 1; // Pick first available valid option
      }
    } else {
      // For React/Vue controlled inputs, directly set prototype value
      const prototype = el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      const nativeSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

      if (nativeSetter) {
        nativeSetter.call(el, String(value));
      } else {
        el.value = String(value);
      }
    }

    // Fire standard sequence of browser events
    el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    el.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));

    return true;
  }
}
