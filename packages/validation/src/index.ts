import type { Product } from '@monty-genius/shared-types';

/**
 * Validates a Monty Genius license key.
 * Expected formats:
 * - MGPRO-XXXX-XXXX-XXXX
 * - MGBIZ-XXXX-XXXX-XXXX
 * - MGLIFE-XXXX-XXXX-XXXX
 * - MGDEV-XXXX-XXXX-XXXX (development only)
 */
export function validateLicenseKey(key: string): { isValid: boolean; error?: string } {
  if (!key || typeof key !== 'string') {
    return { isValid: false, error: 'License key is required' };
  }

  const trimmed = key.trim().toUpperCase();
  // Prefix: 5 chars (MGPRO, MGBIZ, etc), followed by 3 blocks of 4 hex/alphanumeric characters
  const licenseRegex = /^(MGPRO|MGBIZ|MGLIFE|MGDEV|MGFREE)-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

  if (!licenseRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Invalid license format. Expected format: MGPRO-XXXX-XXXX-XXXX',
    };
  }

  return { isValid: true };
}

export function validateDeviceIdentifier(deviceId: string): { isValid: boolean; error?: string } {
  if (!deviceId || typeof deviceId !== 'string') {
    return { isValid: false, error: 'Device identifier is required' };
  }

  const trimmed = deviceId.trim();
  if (trimmed.length < 8 || trimmed.length > 128) {
    return { isValid: false, error: 'Device identifier must be between 8 and 128 characters' };
  }

  const safeRegex = /^[a-zA-Z0-9_-]+$/;
  if (!safeRegex.test(trimmed)) {
    return { isValid: false, error: 'Device identifier contains invalid characters' };
  }

  return { isValid: true };
}

export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email address is required' };
  }

  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Invalid email address format' };
  }

  return { isValid: true };
}

export function validateProduct(product: Partial<Product>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!product.title || product.title.trim().length === 0) {
    errors.push('Product title is required');
  }
  if (!product.sku || product.sku.trim().length === 0) {
    errors.push('Product SKU is required');
  }
  if (product.price === undefined || product.price === null || isNaN(product.price) || product.price < 0) {
    errors.push('Valid selling price is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
