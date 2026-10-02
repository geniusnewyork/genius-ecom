// MONTY GENIUS LICENSE API — Database Seeder

import { db } from './index.js';
import { hashPassword } from '../admin/auth.js';
import { hashLicenseKey, maskLicenseKey } from '../license/generator.js';
const DEFAULT_PLANS = {
  FREE: {
    id: 'FREE',
    name: 'Free Forever',
    price: 0,
    currency: 'INR',
    durationDays: 0,
    maxDevices: 1,
    features: ['BASIC_CALCULATORS', 'PDF_TOOLS', 'IMAGE_TOOLS', 'BULK_TOOLS'],
    active: true,
    description: 'Essential web tools for individuals and budding e-commerce sellers.',
  },
  PRO: {
    id: 'PRO',
    name: 'Seller Pro',
    price: 499,
    currency: 'INR',
    durationDays: 365,
    maxDevices: 2,
    features: [
      'BASIC_CALCULATORS',
      'PDF_TOOLS',
      'IMAGE_TOOLS',
      'BULK_TOOLS',
      'SELLER_EXTENSION',
      'AUTOFILL',
      'ADVANCED_SKU',
      'AI_TOOLS',
    ],
    active: true,
    description: 'Complete seller suite with Seller Assistant Chrome Extension & 1-Click Autofill.',
  },
  BUSINESS: {
    id: 'BUSINESS',
    name: 'Business Growth',
    price: 1499,
    currency: 'INR',
    durationDays: 365,
    maxDevices: 5,
    features: [
      'BASIC_CALCULATORS',
      'PDF_TOOLS',
      'IMAGE_TOOLS',
      'BULK_TOOLS',
      'SELLER_EXTENSION',
      'AUTOFILL',
      'ADVANCED_SKU',
      'AI_TOOLS',
      'MULTI_DEVICE',
      'TEAM_SUPPORT',
    ],
    active: true,
    description: 'For growing e-commerce brands with multiple staff members and packing stations.',
  },
  LIFETIME: {
    id: 'LIFETIME',
    name: 'Lifetime Founder',
    price: 2999,
    currency: 'INR',
    durationDays: 0,
    maxDevices: 3,
    features: [
      'BASIC_CALCULATORS',
      'PDF_TOOLS',
      'IMAGE_TOOLS',
      'BULK_TOOLS',
      'SELLER_EXTENSION',
      'AUTOFILL',
      'ADVANCED_SKU',
      'AI_TOOLS',
      'MULTI_DEVICE',
    ],
    active: true,
    description: 'One-time investment. All current and future Pro features included forever.',
  },
};

export function runSeed() {
  console.log('[SEED] Initializing Monty Genius database...');

  // 1. Seed Plans
  const plans = Object.values(DEFAULT_PLANS);
  for (const p of plans) {
    db.savePlan(p);
  }
  console.log(`[SEED] Seeded ${plans.length} plans (FREE, PRO, BUSINESS, LIFETIME).`);

  // 2. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@montygenius.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@MontyGenius2026!';

  let existingAdmin = db.getUserByEmail(adminEmail);
  if (!existingAdmin) {
    existingAdmin = {
      id: 'usr_admin_01',
      email: adminEmail,
      name: 'Mr. Monty Genius (Super Admin)',
      passwordHash: hashPassword(adminPassword),
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };
    db.createUser(existingAdmin);
    console.log(`[SEED] Created default admin account: ${adminEmail}`);
  }

  // 3. Seed Development Test Licenses
  const devLicenses = [
    { key: 'MGDEV-PRO-7890-ABCD', planId: 'PRO', name: 'Dev Pro Tester', days: 365, maxDev: 2 },
    { key: 'MGDEV-BIZ-1234-EFGH', planId: 'BUSINESS', name: 'Dev Business Tester', days: 365, maxDev: 5 },
    { key: 'MGDEV-LIFE-9999-ZZZZ', planId: 'LIFETIME', name: 'Dev Lifetime Owner', days: 0, maxDev: 10 },
  ];

  for (const dl of devLicenses) {
    const keyHash = hashLicenseKey(dl.key);
    if (!db.getLicenseByKeyHash(keyHash)) {
      const now = new Date();
      const expiresAt = dl.days > 0 ? new Date(now.getTime() + dl.days * 24 * 3600 * 1000).toISOString() : null;
      db.saveLicense({
        id: 'lic_' + dl.planId.toLowerCase() + '_dev',
        keyHash,
        keyMasked: maskLicenseKey(dl.key),
        planId: dl.planId,
        userId: 'dev_user',
        status: 'ACTIVE',
        createdAt: now.toISOString(),
        expiresAt,
        maxDevices: dl.maxDev,
        customerName: dl.name,
        customerEmail: 'dev@montygenius.com',
        notes: 'Pre-seeded development testing license',
      });
      console.log(`[SEED] Created test license: ${dl.key} (${dl.planId})`);
    }
  }

  // 4. Seed Extension Version Settings
  db.setSystemSetting('minSupportedExtensionVersion', '1.0.0');
  db.setSystemSetting('latestExtensionVersion', '1.0.0');

  console.log('✅ Seed completed successfully!');
}

// Run if called directly
if (process.argv[1]?.endsWith('seed.js')) {
  runSeed();
}
