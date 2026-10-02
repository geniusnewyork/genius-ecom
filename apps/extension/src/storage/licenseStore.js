// MONTY GENIUS SELLER ASSISTANT — License Store

export async function getLicenseState() {
  const result = await chrome.storage.local.get(['licenseState']);
  return result.licenseState || {
    isActivated: false,
    licenseKey: null,
    status: 'INACTIVE',
    plan: 'FREE',
    expiresAt: null,
    features: ['BASIC_CALCULATORS', 'PDF_TOOLS', 'IMAGE_TOOLS', 'SELLER_EXTENSION', 'AUTOFILL'],
    authToken: null,
    offlineValidUntil: null,
    lastValidatedAt: null,
    isDevMode: true, // Defaults to owner free mode during development
  };
}

export async function saveLicenseState(state) {
  const current = await getLicenseState();
  const merged = { ...current, ...state, lastUpdatedAt: new Date().toISOString() };
  await chrome.storage.local.set({ licenseState: merged });
  return merged;
}

export async function clearLicenseState() {
  const initial = {
    isActivated: false,
    licenseKey: null,
    status: 'INACTIVE',
    plan: 'FREE',
    expiresAt: null,
    features: ['BASIC_CALCULATORS', 'PDF_TOOLS', 'IMAGE_TOOLS'],
    authToken: null,
    offlineValidUntil: null,
    lastValidatedAt: null,
    isDevMode: false,
  };
  await chrome.storage.local.set({ licenseState: initial });
  return initial;
}
