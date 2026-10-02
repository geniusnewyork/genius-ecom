// MONTY GENIUS SELLER ASSISTANT — Service Worker

import { DEFAULT_MAPPINGS, SAMPLE_PRODUCT } from '../storage/schema.js';
import { getLicenseState, saveLicenseState } from '../storage/licenseStore.js';
import { getOrCreateDeviceIdentifier } from '../services/device.js';

console.log('[MONTY GENIUS] Background service worker initialized.');

chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('[MONTY GENIUS] Extension installed/updated:', details.reason);

  const existing = await chrome.storage.local.get(['mappings', 'products', 'licenseState']);

  if (!existing.mappings) {
    await chrome.storage.local.set({ mappings: DEFAULT_MAPPINGS });
  }

  if (!existing.products) {
    await chrome.storage.local.set({ products: [SAMPLE_PRODUCT] });
  }

  if (!existing.licenseState) {
    await chrome.storage.local.set({
      licenseState: {
        isActivated: false,
        licenseKey: null,
        status: 'INACTIVE',
        plan: 'FREE',
        expiresAt: null,
        features: ['BASIC_CALCULATORS', 'PDF_TOOLS', 'IMAGE_TOOLS', 'SELLER_EXTENSION', 'AUTOFILL'],
        authToken: null,
        offlineValidUntil: null,
        lastValidatedAt: null,
        isDevMode: true, // Personal Free Mode enabled by default for owner
      },
    });
  }

  // Pre-generate device installation identifier
  await getOrCreateDeviceIdentifier();
});

// Periodic validation alarm (runs once a day)
chrome.alarms.create('license_validation_check', { periodInMinutes: 1440 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'license_validation_check') {
    const state = await getLicenseState();
    if (state.isActivated && !state.isDevMode) {
      console.log('[MONTY GENIUS] Checking license renewal/validity...');
      // Validation handled when popup opens or via fetch
    }
  }
});
