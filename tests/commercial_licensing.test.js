// MONTY GENIUS ECOM TOOLS — Commercial Licensing & Security Test Suite

import assert from 'node:assert';
import { validateLicenseKey, validateDeviceIdentifier, validateEmail } from '../packages/validation/src/index.js';
import { hasFeature, DEFAULT_PLANS } from '../packages/config/src/index.js';
import { hashLicenseKey, generateLicenseKey, maskLicenseKey } from '../services/license-api/src/license/generator.js';
import { signAuthToken, verifyAuthToken } from '../services/license-api/src/license/signer.js';

console.log('🧪 Starting Commercial Licensing & Security Test Suite...\n');

// 1. Key Format & Validation
console.log('Running Test 1: License Key Validation...');
assert.strictEqual(validateLicenseKey('MGPRO-ABCD-1234-EF56').isValid, true);
assert.strictEqual(validateLicenseKey('MGBIZ-9999-AAAA-BBBB').isValid, true);
assert.strictEqual(validateLicenseKey('MGLIFE-1111-2222-3333').isValid, true);
assert.strictEqual(validateLicenseKey('MGDEV-PRO-7890-ABCD').isValid, true);

// Invalid formats
assert.strictEqual(validateLicenseKey('INVALID-KEY').isValid, false);
assert.strictEqual(validateLicenseKey('MGPRO-123-456-789').isValid, false);
assert.strictEqual(validateLicenseKey('').isValid, false);
console.log('✅ Test 1 Passed: Key Format Validation Verified.\n');

// 2. Cryptographic Random Generation
console.log('Running Test 2: Cryptographic Key Generator & Hasher...');
const generated = generateLicenseKey('PRO');
assert.ok(generated.key.startsWith('MGPRO-'));
assert.strictEqual(generated.keyHash.length, 64); // SHA-256 hex string
assert.strictEqual(maskLicenseKey(generated.key).endsWith('****-****'), true);

const generatedBiz = generateLicenseKey('BUSINESS');
assert.ok(generatedBiz.key.startsWith('MGBIZ-'));
console.log('✅ Test 2 Passed: Cryptographic Generator & Hasher Verified.\n');

// 3. Device Identifier & Privacy Validation
console.log('Running Test 3: Device Identifier Validation...');
assert.strictEqual(validateDeviceIdentifier('dev_982ab389fe').isValid, true);
assert.strictEqual(validateDeviceIdentifier('short').isValid, false); // min 8 chars
assert.strictEqual(validateDeviceIdentifier('dev_invalid@#$').isValid, false); // invalid chars
console.log('✅ Test 3 Passed: Device Identifier Validation Verified.\n');

// 4. Feature Flag Entitlements
console.log('Running Test 4: Central Feature Entitlement Engine...');
// Free plan should not have SELLER_EXTENSION
assert.strictEqual(hasFeature('FREE', 'SELLER_EXTENSION'), false);
assert.strictEqual(hasFeature('FREE', 'BASIC_CALCULATORS'), true);

// Pro plan has SELLER_EXTENSION and AUTOFILL, but not TEAM_SUPPORT
assert.strictEqual(hasFeature('PRO', 'SELLER_EXTENSION'), true);
assert.strictEqual(hasFeature('PRO', 'AUTOFILL'), true);
assert.strictEqual(hasFeature('PRO', 'TEAM_SUPPORT'), false);

// Business plan has TEAM_SUPPORT and MULTI_DEVICE
assert.strictEqual(hasFeature('BUSINESS', 'TEAM_SUPPORT'), true);
assert.strictEqual(hasFeature('BUSINESS', 'MULTI_DEVICE'), true);
console.log('✅ Test 4 Passed: Feature Entitlement Checks Verified.\n');

// 5. HMAC Offline Token Signing & Tamper Resistance
console.log('Running Test 5: HMAC Offline Token Signing & Tamper Verification...');
const token = signAuthToken({
  licenseId: 'lic_test_123',
  deviceIdentifier: 'dev_laptop_001',
  plan: 'PRO',
  validUntil: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
});

assert.ok(token.includes('.'));
const verified = verifyAuthToken(token);
assert.strictEqual(verified.licenseId, 'lic_test_123');
assert.strictEqual(verified.deviceIdentifier, 'dev_laptop_001');

// Tamper test: modify payload
const parts = token.split('.');
const tamperedPayload = Buffer.from(JSON.stringify({ licenseId: 'lic_HACKED' })).toString('base64url');
const tamperedToken = `${tamperedPayload}.${parts[1]}`;
const tamperResult = verifyAuthToken(tamperedToken);
assert.strictEqual(tamperResult, null); // Signature mismatch rejected!

// Expired token test
const expiredToken = signAuthToken({
  licenseId: 'lic_expired',
  validUntil: new Date(Date.now() - 10000).toISOString(), // in the past
});
assert.strictEqual(verifyAuthToken(expiredToken), null); // Expired rejected!
console.log('✅ Test 5 Passed: HMAC Token Signing & Tamper Rejection Verified.\n');

console.log('====================================================');
console.log('✅ ALL COMMERCIAL LICENSING & SECURITY TESTS PASSED!');
console.log('====================================================\n');
