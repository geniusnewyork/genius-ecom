// MONTY GENIUS LICENSE API — HMAC Offline Token Signer

import crypto from 'crypto';

const SIGNING_SECRET = process.env.LICENSE_SIGNING_SECRET || 'mg_sec_prod_offline_signing_vault_2026';

export function signAuthToken(payload) {
  const dataString = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SIGNING_SECRET)
    .update(dataString)
    .digest('base64url');

  return `${dataString}.${signature}`;
}

export function verifyAuthToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [dataString, receivedSig] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SIGNING_SECRET)
    .update(dataString)
    .digest('base64url');

  if (receivedSig !== expectedSig) {
    return null; // Invalid signature / tampered token
  }

  try {
    const raw = Buffer.from(dataString, 'base64url').toString('utf-8');
    const payload = JSON.parse(raw);

    // Check expiration
    if (payload.validUntil && Date.now() > new Date(payload.validUntil).getTime()) {
      return null; // Expired token
    }

    return payload;
  } catch (e) {
    return null;
  }
}
