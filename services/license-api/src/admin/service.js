// MONTY GENIUS LICENSE API — Admin Business Operations

import { db } from '../db/index.js';
import { generateLicenseKey } from '../license/generator.js';

export class AdminService {
  static getDashboardStats() {
    const licenses = db.getLicenses();
    const devices = db.getDevices();
    const plans = db.getPlans();

    const activeLicenses = licenses.filter((l) => l.status === 'ACTIVE').length;
    const activeDevices = devices.filter((d) => d.status === 'ACTIVE').length;
    const expiredLicenses = licenses.filter((l) => l.status === 'EXPIRED').length;
    const suspendedLicenses = licenses.filter((l) => l.status === 'SUSPENDED').length;

    // Calculate revenue from active licenses based on plans
    let totalRevenue = 0;
    for (const lic of licenses) {
      const plan = plans.find((p) => p.id === lic.planId);
      if (plan && plan.price) {
        totalRevenue += plan.price;
      }
    }

    return {
      totalLicenses: licenses.length,
      activeLicenses,
      expiredLicenses,
      suspendedLicenses,
      activeDevices,
      totalRevenue,
      plansCount: plans.length,
      recentActivations: db.data.activations.slice(0, 5),
    };
  }

  static createLicense({ planId, customerName, customerEmail, notes, maxDevices, durationDays, adminId }) {
    const plan = db.getPlanById(planId);
    if (!plan) throw new Error('Invalid plan ID');

    const keyData = generateLicenseKey(planId);
    const now = new Date();
    const days = durationDays !== undefined ? durationDays : plan.durationDays;
    const expiresAt = days > 0 ? new Date(now.getTime() + days * 24 * 3600 * 1000).toISOString() : null;

    const license = {
      id: 'lic_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      keyHash: keyData.keyHash,
      keyMasked: keyData.keyMasked,
      planId,
      userId: customerEmail || 'guest',
      status: 'ACTIVE',
      createdAt: now.toISOString(),
      expiresAt,
      maxDevices: maxDevices || plan.maxDevices || 1,
      customerName: customerName || 'Valued Seller',
      customerEmail: customerEmail || '',
      notes: notes || '',
    };

    db.saveLicense(license);

    db.addAuditLog({
      action: 'LICENSE_CREATED',
      licenseId: license.id,
      actorId: adminId || 'admin',
      actorType: 'ADMIN',
      details: { planId, customerEmail, expiresAt },
    });

    return {
      ...license,
      plainLicenseKey: keyData.key, // Only returned once upon creation!
    };
  }

  static updateLicenseStatus(licenseId, status, adminId, reason = '') {
    const license = db.getLicenseById(licenseId);
    if (!license) throw new Error('License not found');

    license.status = status;
    db.saveLicense(license);

    db.addAuditLog({
      action: status === 'REVOKED' ? 'LICENSE_REVOKED' : status === 'SUSPENDED' ? 'LICENSE_SUSPENDED' : 'LICENSE_REACTIVATED',
      licenseId,
      actorId: adminId,
      actorType: 'ADMIN',
      details: { status, reason },
    });

    return license;
  }

  static extendLicense(licenseId, daysToAdd, adminId) {
    const license = db.getLicenseById(licenseId);
    if (!license) throw new Error('License not found');

    const currentExpiry = license.expiresAt ? new Date(license.expiresAt).getTime() : Date.now();
    const baseTime = Math.max(currentExpiry, Date.now());
    license.expiresAt = new Date(baseTime + daysToAdd * 24 * 3600 * 1000).toISOString();
    license.status = 'ACTIVE';

    db.saveLicense(license);

    db.addAuditLog({
      action: 'LICENSE_EXTENDED',
      licenseId,
      actorId: adminId,
      actorType: 'ADMIN',
      details: { daysToAdd, newExpiresAt: license.expiresAt },
    });

    return license;
  }

  static resetDevices(licenseId, adminId) {
    const license = db.getLicenseById(licenseId);
    if (!license) throw new Error('License not found');

    const devices = db.getDevicesByLicenseId(licenseId);
    for (const d of devices) {
      d.status = 'INACTIVE';
      db.saveDevice(d);
    }

    db.addAuditLog({
      action: 'DEVICE_RESET',
      licenseId,
      actorId: adminId,
      actorType: 'ADMIN',
      details: { count: devices.length },
    });

    return { success: true, count: devices.length };
  }
}
