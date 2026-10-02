// MONTY GENIUS LICENSE API — Core Licensing Engine

import { db } from '../db/index.js';
import { hashLicenseKey } from './generator.js';
import { signAuthToken } from './signer.js';

export class LicenseService {
  /**
   * Activates a license key for a given device.
   */
  static async activate({ licenseKey, deviceIdentifier, deviceName, platform, extensionVersion, ipAddress }) {
    if (!licenseKey || !deviceIdentifier) {
      return {
        success: false,
        error: { code: 'INVALID_PAYLOAD', message: 'License key and device identifier are required.' },
      };
    }

    // Version validation check
    const versionConfig = db.getExtensionVersionConfig();
    if (extensionVersion && this.compareVersions(extensionVersion, versionConfig.minSupportedVersion) < 0) {
      return {
        success: false,
        error: {
          code: 'UPDATE_REQUIRED',
          message: `Extension version ${extensionVersion} is no longer supported. Please update to version ${versionConfig.latestVersion} or higher.`,
        },
      };
    }

    const keyHash = hashLicenseKey(licenseKey);
    const license = db.getLicenseByKeyHash(keyHash);

    if (!license) {
      return {
        success: false,
        error: { code: 'LICENSE_INVALID', message: 'The provided license key was not found or is invalid.' },
      };
    }

    // Status checks
    if (license.status === 'REVOKED') {
      return {
        success: false,
        error: { code: 'LICENSE_REVOKED', message: 'This license has been revoked by administration.' },
      };
    }

    if (license.status === 'SUSPENDED') {
      return {
        success: false,
        error: { code: 'LICENSE_SUSPENDED', message: 'This license is temporarily suspended. Please contact billing support.' },
      };
    }

    if (license.expiresAt && new Date(license.expiresAt).getTime() < Date.now()) {
      license.status = 'EXPIRED';
      db.saveLicense(license);
      return {
        success: false,
        error: { code: 'LICENSE_EXPIRED', message: 'This license has expired. Please renew your plan.' },
      };
    }

    // Check plan & features
    const plan = db.getPlanById(license.planId);
    const features = plan ? plan.features : ['BASIC_CALCULATORS', 'SELLER_EXTENSION', 'AUTOFILL'];
    const maxDevices = license.maxDevices || (plan ? plan.maxDevices : 1);

    // Device check
    const existingDevices = db.getDevicesByLicenseId(license.id);
    const currentDevice = db.getDeviceByIdentifier(license.id, deviceIdentifier);

    if (currentDevice) {
      // Re-activating existing device
      currentDevice.status = 'ACTIVE';
      currentDevice.lastSeenAt = new Date().toISOString();
      if (deviceName) currentDevice.deviceName = deviceName;
      if (platform) currentDevice.platform = platform;
      if (extensionVersion) currentDevice.extensionVersion = extensionVersion;
      db.saveDevice(currentDevice);
    } else {
      // New device: check device limit
      if (existingDevices.length >= maxDevices) {
        return {
          success: false,
          error: {
            code: 'DEVICE_LIMIT_REACHED',
            message: `You have reached your plan device limit (${existingDevices.length} / ${maxDevices}). Disconnect an old workstation seat from settings or upgrade your plan.`,
            currentDevices: existingDevices.length,
            maxDevices,
          },
        };
      }

      // Register new device
      const newDevice = {
        id: 'dev_rec_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
        licenseId: license.id,
        deviceIdentifier,
        deviceName: deviceName || 'Seller Workstation',
        platform: platform || 'Browser',
        extensionVersion: extensionVersion || '1.0.0',
        firstSeenAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        status: 'ACTIVE',
      };
      db.saveDevice(newDevice);

      db.addAuditLog({
        action: 'DEVICE_ACTIVATED',
        licenseId: license.id,
        deviceId: newDevice.id,
        actorType: 'USER',
        details: { deviceName, platform, extensionVersion },
      });
    }

    // Record activation
    db.recordActivation({
      id: 'act_' + Date.now().toString(36),
      licenseId: license.id,
      deviceId: deviceIdentifier,
      ipAddressHash: ipAddress ? hashLicenseKey(ipAddress) : undefined,
      timestamp: new Date().toISOString(),
    });

    db.addAuditLog({
      action: 'LICENSE_ACTIVATED',
      licenseId: license.id,
      actorType: 'USER',
      details: { deviceIdentifier, extensionVersion },
    });

    // Generate signed short-lived offline authorization token (72 hours grace period)
    const validUntil = new Date(Date.now() + 72 * 3600 * 1000).toISOString();
    const authToken = signAuthToken({
      licenseId: license.id,
      deviceIdentifier,
      plan: license.planId,
      validUntil,
    });

    return {
      success: true,
      licenseStatus: license.status,
      plan: license.planId,
      expiresAt: license.expiresAt,
      features,
      authToken,
      offlineValidUntil: validUntil,
    };
  }

  /**
   * Validates periodic license heartbeat.
   */
  static async validate({ licenseKey, deviceIdentifier, extensionVersion }) {
    if (!licenseKey || !deviceIdentifier) {
      return { success: false, error: { code: 'INVALID_PAYLOAD', message: 'Missing parameters.' } };
    }

    const keyHash = hashLicenseKey(licenseKey);
    const license = db.getLicenseByKeyHash(keyHash);

    if (!license) {
      return { success: false, error: { code: 'LICENSE_INVALID', message: 'License key not recognized.' } };
    }

    if (license.status !== 'ACTIVE') {
      return {
        success: false,
        licenseStatus: license.status,
        error: { code: 'LICENSE_NOT_ACTIVE', message: `License status is currently ${license.status}.` },
      };
    }

    // Touch device lastSeenAt
    const dev = db.getDeviceByIdentifier(license.id, deviceIdentifier);
    if (dev) {
      dev.lastSeenAt = new Date().toISOString();
      if (extensionVersion) dev.extensionVersion = extensionVersion;
      db.saveDevice(dev);
    }

    const plan = db.getPlanById(license.planId);
    const features = plan ? plan.features : ['BASIC_CALCULATORS', 'SELLER_EXTENSION', 'AUTOFILL'];

    return {
      success: true,
      licenseStatus: license.status,
      plan: license.planId,
      expiresAt: license.expiresAt,
      features,
    };
  }

  /**
   * Deactivates a device from a license seat to free it up for a new laptop.
   */
  static async deactivateDevice({ licenseKey, deviceIdentifier }) {
    const keyHash = hashLicenseKey(licenseKey);
    const license = db.getLicenseByKeyHash(keyHash);

    if (!license) {
      return { success: false, message: 'License not found.' };
    }

    const deleted = db.deleteDevice(license.id, deviceIdentifier);
    if (deleted) {
      db.addAuditLog({
        action: 'DEVICE_DEACTIVATED',
        licenseId: license.id,
        actorType: 'USER',
        details: { deviceIdentifier },
      });
      return { success: true, message: 'Device seat released successfully.' };
    }

    return { success: false, message: 'Device not found on this license.' };
  }

  static compareVersions(v1, v2) {
    const p1 = v1.split('.').map(Number);
    const p2 = v2.split('.').map(Number);
    for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
      const n1 = p1[i] || 0;
      const n2 = p2[i] || 0;
      if (n1 > n2) return 1;
      if (n1 < n2) return -1;
    }
    return 0;
  }
}
