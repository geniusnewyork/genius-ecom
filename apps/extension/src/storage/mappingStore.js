// MONTY GENIUS SELLER ASSISTANT — Mapping Store

import { DEFAULT_MAPPINGS } from './schema.js';

export async function getMappings() {
  const result = await chrome.storage.local.get(['mappings']);
  if (!result.mappings || !Array.isArray(result.mappings)) {
    await chrome.storage.local.set({ mappings: DEFAULT_MAPPINGS });
    return DEFAULT_MAPPINGS;
  }
  return result.mappings;
}

export async function saveMappings(mappings) {
  await chrome.storage.local.set({ mappings });
  return mappings;
}

export async function resetMappings() {
  await chrome.storage.local.set({ mappings: DEFAULT_MAPPINGS });
  return DEFAULT_MAPPINGS;
}
