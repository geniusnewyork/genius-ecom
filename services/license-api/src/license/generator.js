// MONTY GENIUS LICENSE API — Cryptographic Key Generator & Hasher

import crypto from 'crypto';

export function hashLicenseKey(key) {
  const normalized = key.trim().toUpperCase();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

export function maskLicenseKey(key) {
  const parts = key.trim().toUpperCase().split('-');
  if (parts.length === 4) {
    return `${parts[0]}-${parts[1]}-****-****`;
  }
  return key.slice(0, 8) + '****';
}

/**
 * Generates a cryptographically secure random license key.
 * Format: MGPRO-XXXX-XXXX-XXXX (16 random uppercase hex/alphanumeric chars)
 */
export function generateLicenseKey(planId = 'PRO') {
  let prefix = 'MGPRO';
  if (planId === 'BUSINESS') prefix = 'MGBIZ';
  else if (planId === 'LIFETIME') prefix = 'MGLIFE';
  else if (planId === 'FREE') prefix = 'MGFREE';

  // 3 blocks of 4 cryptographically secure random characters
  const bytes = crypto.randomBytes(6); // 12 hex chars
  const hex = bytes.toString('hex').toUpperCase();

  const block1 = hex.slice(0, 4);
  const block2 = hex.slice(4, 8);
  const block3 = hex.slice(8, 12);

  const key = `${prefix}-${block1}-${block2}-${block3}`;
  const keyHash = hashLicenseKey(key);
  const keyMasked = maskLicenseKey(key);

  return {
    key, // Full key shown to user/admin on creation
    keyHash, // Stored in database for verification
    keyMasked, // Stored in database for UI display
  };
}
