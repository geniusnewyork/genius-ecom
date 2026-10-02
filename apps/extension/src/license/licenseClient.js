// MONTY GENIUS SELLER ASSISTANT — License Client

import { getLicenseState, saveLicenseState } from '../storage/licenseStore.js';
import { getOrCreateDeviceIdentifier } from '../services/device.js';

export const API_BASE_URL = 'http://localhost:3001/api/v1';

export async function activateLicense(licenseKey) {
  const deviceInfo = await getOrCreateDeviceIdentifier();
  const manifest = chrome.runtime.getManifest();
  const extensionVersion = manifest.version || '1.0.0';

  // Check Development Mode bypass
  const currentState = await getLicenseState();
  if (currentState.isDevMode && licenseKey.startsWith('MGDEV-')) {
    const devState = {
      isActivated: true,
      licenseKey,
      status: 'ACTIVE',
      plan: 'LIFETIME',
      expiresAt: null,
      features: [
        'BASIC_CALCULATORS',
        'PDF_TOOLS',
        'IMAGE_TOOLS',
        'SELLER_EXTENSION',
        'AUTOFILL',
        'ADVANCED_SKU',
        'AI_TOOLS',
        'BULK_TOOLS',
        'MULTI_DEVICE',
      ],
      authToken: 'dev_token_' + Date.now(),
      offlineValidUntil: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
      lastValidatedAt: new Date().toISOString(),
    };
    await saveLicenseState(devState);
    return { success: true, licenseStatus: 'ACTIVE', plan: 'LIFETIME', features: devState.features };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/license/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        licenseKey: licenseKey.trim().toUpperCase(),
        deviceIdentifier: deviceInfo.deviceIdentifier,
        deviceName: deviceInfo.deviceName,
        platform: deviceInfo.platform,
        extensionVersion,
      }),
    });

    const data = await response.json();

    if (data.success) {
      await saveLicenseState({
        isActivated: true,
        licenseKey: licenseKey.trim().toUpperCase(),
        status: data.licenseStatus,
        plan: data.plan,
        expiresAt: data.expiresAt,
        features: data.features,
        authToken: data.authToken,
        offlineValidUntil: data.offlineValidUntil,
        lastValidatedAt: new Date().toISOString(),
      });
      return { success: true, ...data };
    } else {
      return { success: false, error: data.error };
    }
  } catch (err) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Could not connect to license server. Please verify your connection or try again later.',
      },
    };
  }
}

export async function validateCurrentLicense() {
  const state = await getLicenseState();
  if (!state.isActivated || !state.licenseKey) {
    return { success: false, status: 'INACTIVE' };
  }

  // If in Dev mode
  if (state.isDevMode) {
    return { success: true, status: 'ACTIVE', plan: state.plan, features: state.features };
  }

  // Check offline grace period first
  if (state.offlineValidUntil) {
    const validUntil = new Date(state.offlineValidUntil).getTime();
    if (Date.now() < validUntil) {
      // Still within offline validity!
    }
  }

  const deviceInfo = await getOrCreateDeviceIdentifier();
  const manifest = chrome.runtime.getManifest();

  try {
    const response = await fetch(`${API_BASE_URL}/license/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        licenseKey: state.licenseKey,
        deviceIdentifier: deviceInfo.deviceIdentifier,
        authToken: state.authToken,
        extensionVersion: manifest.version,
      }),
    });

    const data = await response.json();

    if (data.success) {
      await saveLicenseState({
        status: data.licenseStatus,
        plan: data.plan,
        expiresAt: data.expiresAt,
        features: data.features,
        lastValidatedAt: new Date().toISOString(),
      });
      return { success: true, ...data };
    } else {
      // Server returned invalid / expired / suspended
      await saveLicenseState({
        status: data.licenseStatus || 'INVALID',
      });
      return { success: false, error: data.error };
    }
  } catch (err) {
    // Offline resilience: if within offline grace period, return cached authorized state
    if (state.offlineValidUntil && Date.now() < new Date(state.offlineValidUntil).getTime()) {
      return {
        success: true,
        status: state.status,
        plan: state.plan,
        features: state.features,
        isOfflineCached: true,
      };
    }

    return {
      success: false,
      error: { code: 'NETWORK_ERROR', message: 'License server unreachable and offline grace period expired.' },
    };
  }
}

export async function deactivateDevice() {
  const state = await getLicenseState();
  if (!state.licenseKey) return { success: false, message: 'No active license found.' };

  const deviceInfo = await getOrCreateDeviceIdentifier();

  try {
    const response = await fetch(`${API_BASE_URL}/license/deactivate-device`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        licenseKey: state.licenseKey,
        deviceIdentifier: deviceInfo.deviceIdentifier,
      }),
    });

    const data = await response.json();
    if (data.success) {
      await saveLicenseState({
        isActivated: false,
        status: 'INACTIVE',
      });
    }
    return data;
  } catch (err) {
    return { success: false, message: 'Network error deactivating device.' };
  }
}

export async function checkEntitlement(featureKey) {
  const state = await getLicenseState();
  if (state.isDevMode) return true;
  return state.isActivated && Array.isArray(state.features) && state.features.includes(featureKey);
}
