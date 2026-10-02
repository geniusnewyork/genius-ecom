// MONTY GENIUS SELLER ASSISTANT — Privacy-Conscious Device Identity

export async function getOrCreateDeviceIdentifier() {
  const result = await chrome.storage.local.get(['deviceIdentifier', 'deviceName']);
  let deviceId = result.deviceIdentifier;
  let deviceName = result.deviceName;

  if (!deviceId) {
    // Generate a secure random 32-character installation identifier
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    deviceId = 'dev_' + Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    
    // Friendly device name based on platform
    let platform = 'Browser';
    if (navigator.userAgent.includes('Windows')) platform = 'Windows Laptop';
    else if (navigator.userAgent.includes('Macintosh')) platform = 'MacBook / Mac';
    else if (navigator.userAgent.includes('Linux')) platform = 'Linux Workstation';
    
    deviceName = `${platform} (${deviceId.slice(-6)})`;

    await chrome.storage.local.set({
      deviceIdentifier: deviceId,
      deviceName,
      platform: navigator.platform || 'Unknown',
    });
  }

  return {
    deviceIdentifier: deviceId,
    deviceName: deviceName || 'Seller Laptop',
    platform: navigator.platform || 'Unknown',
  };
}
