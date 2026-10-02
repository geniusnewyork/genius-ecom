// MONTY GENIUS LICENSE API — Database Engine & Abstraction

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../../data/license_db.json');

class DatabaseEngine {
  constructor() {
    this.data = {
      users: [],
      plans: [],
      licenses: [],
      devices: [],
      activations: [],
      auditLogs: [],
      extensionVersions: [],
      systemSettings: {},
    };
    this.init();
  }

  init() {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (e) {
        console.error('[DB] Error reading database file, initializing empty:', e.message);
        this.persist();
      }
    } else {
      this.persist();
    }
  }

  persist() {
    try {
      const tempFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (e) {
      console.error('[DB] Error persisting database file:', e.message);
    }
  }

  // --- Users ---
  getUserByEmail(email) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  getUserById(id) {
    return this.data.users.find((u) => u.id === id) || null;
  }

  createUser(user) {
    this.data.users.push(user);
    this.persist();
    return user;
  }

  // --- Plans ---
  getPlans() {
    return this.data.plans;
  }

  getPlanById(id) {
    return this.data.plans.find((p) => p.id === id) || null;
  }

  savePlan(plan) {
    const idx = this.data.plans.findIndex((p) => p.id === plan.id);
    if (idx >= 0) {
      this.data.plans[idx] = plan;
    } else {
      this.data.plans.push(plan);
    }
    this.persist();
    return plan;
  }

  // --- Licenses ---
  getLicenses() {
    return this.data.licenses;
  }

  getLicenseById(id) {
    return this.data.licenses.find((l) => l.id === id) || null;
  }

  getLicenseByKeyHash(keyHash) {
    return this.data.licenses.find((l) => l.keyHash === keyHash) || null;
  }

  saveLicense(license) {
    const idx = this.data.licenses.findIndex((l) => l.id === license.id);
    if (idx >= 0) {
      this.data.licenses[idx] = license;
    } else {
      this.data.licenses.unshift(license);
    }
    this.persist();
    return license;
  }

  // --- Devices ---
  getDevices() {
    return this.data.devices;
  }

  getDevicesByLicenseId(licenseId) {
    return this.data.devices.filter((d) => d.licenseId === licenseId && d.status === 'ACTIVE');
  }

  getDeviceByIdentifier(licenseId, deviceIdentifier) {
    return this.data.devices.find(
      (d) => d.licenseId === licenseId && d.deviceIdentifier === deviceIdentifier
    ) || null;
  }

  saveDevice(device) {
    const idx = this.data.devices.findIndex(
      (d) => d.licenseId === device.licenseId && d.deviceIdentifier === device.deviceIdentifier
    );
    if (idx >= 0) {
      this.data.devices[idx] = device;
    } else {
      this.data.devices.push(device);
    }
    this.persist();
    return device;
  }

  deleteDevice(licenseId, deviceIdentifier) {
    const dev = this.getDeviceByIdentifier(licenseId, deviceIdentifier);
    if (dev) {
      dev.status = 'INACTIVE';
      dev.lastSeenAt = new Date().toISOString();
      this.persist();
      return true;
    }
    return false;
  }

  // --- Activations ---
  recordActivation(activation) {
    this.data.activations.unshift(activation);
    if (this.data.activations.length > 5000) {
      this.data.activations.pop();
    }
    this.persist();
    return activation;
  }

  // --- Audit Logs ---
  addAuditLog(log) {
    const record = {
      id: 'aud_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      ...log,
    };
    this.data.auditLogs.unshift(record);
    if (this.data.auditLogs.length > 5000) {
      this.data.auditLogs.pop();
    }
    this.persist();
    return record;
  }

  getAuditLogs(limit = 100) {
    return this.data.auditLogs.slice(0, limit);
  }

  // --- Extension Versions & Settings ---
  getExtensionVersionConfig() {
    return {
      minSupportedVersion: this.data.systemSettings['minSupportedExtensionVersion'] || '1.0.0',
      latestVersion: this.data.systemSettings['latestExtensionVersion'] || '1.0.0',
    };
  }

  setSystemSetting(key, value) {
    this.data.systemSettings[key] = value;
    this.persist();
  }
}

export const db = new DatabaseEngine();
