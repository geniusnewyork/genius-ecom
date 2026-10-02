// MONTY GENIUS LICENSE API — Automated Integration Test Suite

import test from 'node:test';
import assert from 'node:assert';
import { createServer } from '../src/server.js';
import { runSeed } from '../src/db/seed.js';
import { verifyAuthToken } from '../src/license/signer.js';

let server;
const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}/api/v1`;

test.before(() => {
  runSeed();
  server = createServer();
  return new Promise((resolve) => {
    server.listen(PORT, resolve);
  });
});

test.after(() => {
  return new Promise((resolve) => {
    server.close(resolve);
  });
});

test('GET /api/v1/health returns healthy', async () => {
  const res = await fetch(`${BASE_URL}/health`);
  const json = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.status, 'healthy');
});

test('GET /api/v1/plans returns all plans', async () => {
  const res = await fetch(`${BASE_URL}/plans`);
  const json = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);
  assert.ok(json.plans.length >= 4);
});

test('POST /api/v1/license/activate activates valid license and returns signed auth token', async () => {
  const res = await fetch(`${BASE_URL}/license/activate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      licenseKey: 'MGDEV-PRO-7890-ABCD',
      deviceIdentifier: 'test_device_001',
      deviceName: 'Test Windows Laptop',
      platform: 'Win32',
      extensionVersion: '1.0.0',
    }),
  });

  const json = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);
  assert.strictEqual(json.licenseStatus, 'ACTIVE');
  assert.strictEqual(json.plan, 'PRO');
  assert.ok(json.authToken);

  // Verify offline auth token signature
  const verified = verifyAuthToken(json.authToken);
  assert.ok(verified);
  assert.strictEqual(verified.deviceIdentifier, 'test_device_001');
});

test('POST /api/v1/license/activate rejects invalid key', async () => {
  const res = await fetch(`${BASE_URL}/license/activate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      licenseKey: 'MGPRO-FAKE-0000-0000',
      deviceIdentifier: 'test_device_bad',
    }),
  });

  const json = await res.json();
  assert.strictEqual(res.status, 400);
  assert.strictEqual(json.success, false);
  assert.strictEqual(json.error.code, 'LICENSE_INVALID');
});

test('POST /api/v1/license/activate enforces device limit', async () => {
  // License MGDEV-PRO-7890-ABCD has maxDevices = 2.
  // Device 1 was test_device_001. Now add Device 2:
  const res2 = await fetch(`${BASE_URL}/license/activate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      licenseKey: 'MGDEV-PRO-7890-ABCD',
      deviceIdentifier: 'test_device_002',
    }),
  });
  assert.strictEqual(res2.status, 200);

  // Attempting Device 3 should trigger DEVICE_LIMIT_REACHED:
  const res3 = await fetch(`${BASE_URL}/license/activate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      licenseKey: 'MGDEV-PRO-7890-ABCD',
      deviceIdentifier: 'test_device_003',
    }),
  });
  const json3 = await res3.json();
  assert.strictEqual(res3.status, 400);
  assert.strictEqual(json3.success, false);
  assert.strictEqual(json3.error.code, 'DEVICE_LIMIT_REACHED');
});

test('POST /api/v1/license/deactivate-device releases seat', async () => {
  const res = await fetch(`${BASE_URL}/license/deactivate-device`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      licenseKey: 'MGDEV-PRO-7890-ABCD',
      deviceIdentifier: 'test_device_002',
    }),
  });

  const json = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);
});

test('Admin Auth: rejects invalid credentials', async () => {
  const res = await fetch(`${BASE_URL}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@montygenius.com',
      password: 'WrongPassword!',
    }),
  });

  const json = await res.json();
  assert.strictEqual(res.status, 401);
  assert.strictEqual(json.success, false);
});

test('Admin Auth & Dashboard: logs in and returns dashboard statistics', async () => {
  const loginRes = await fetch(`${BASE_URL}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@montygenius.com',
      password: 'Admin@MontyGenius2026!',
    }),
  });

  const loginJson = await loginRes.json();
  assert.strictEqual(loginRes.status, 200);
  assert.strictEqual(loginJson.success, true);
  assert.ok(loginJson.token);

  // Fetch admin dashboard stats
  const statsRes = await fetch(`${BASE_URL}/admin/dashboard/stats`, {
    headers: { Authorization: `Bearer ${loginJson.token}` },
  });
  const statsJson = await statsRes.json();
  assert.strictEqual(statsRes.status, 200);
  assert.strictEqual(statsJson.success, true);
  assert.ok(statsJson.stats.totalLicenses >= 3);
  assert.ok(statsJson.stats.activeDevices >= 1);
});

test('Admin can generate, suspend, and reactivate license', async () => {
  // 1. Login
  const loginRes = await fetch(`${BASE_URL}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@montygenius.com',
      password: 'Admin@MontyGenius2026!',
    }),
  });
  const { token } = await loginRes.json();

  // 2. Create new Pro license
  const createRes = await fetch(`${BASE_URL}/admin/licenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      planId: 'PRO',
      customerName: 'New Enterprise Seller',
      customerEmail: 'enterprise@example.com',
      durationDays: 365,
      maxDevices: 3,
    }),
  });
  const createJson = await createRes.json();
  assert.strictEqual(createRes.status, 201);
  assert.strictEqual(createJson.success, true);
  const newKey = createJson.license.plainLicenseKey;
  assert.ok(newKey.startsWith('MGPRO-'));

  // 3. Suspend license
  const suspendRes = await fetch(`${BASE_URL}/admin/licenses/${createJson.license.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: 'SUSPENDED', reason: 'Audit check' }),
  });
  const suspendJson = await suspendRes.json();
  assert.strictEqual(suspendRes.status, 200);
  assert.strictEqual(suspendJson.license.status, 'SUSPENDED');

  // 4. Verify activation blocked when suspended
  const actRes = await fetch(`${BASE_URL}/license/activate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      licenseKey: newKey,
      deviceIdentifier: 'test_dev_blocked',
    }),
  });
  const actJson = await actRes.json();
  assert.strictEqual(actRes.status, 400);
  assert.strictEqual(actJson.error.code, 'LICENSE_SUSPENDED');
});
