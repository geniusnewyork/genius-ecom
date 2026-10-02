// MONTY GENIUS ECOM TOOLS — Shared Types

export type PlanId = 'FREE' | 'PRO' | 'BUSINESS' | 'LIFETIME';

export type LicenseStatus = 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'REVOKED';

export type DeviceStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

export type AuditAction =
  | 'LICENSE_CREATED'
  | 'LICENSE_ACTIVATED'
  | 'LICENSE_VALIDATED'
  | 'LICENSE_SUSPENDED'
  | 'LICENSE_REVOKED'
  | 'LICENSE_REACTIVATED'
  | 'LICENSE_EXTENDED'
  | 'DEVICE_ACTIVATED'
  | 'DEVICE_DEACTIVATED'
  | 'DEVICE_RESET'
  | 'PLAN_CHANGED'
  | 'EXPIRY_CHANGED'
  | 'ADMIN_LOGIN'
  | 'ADMIN_LOGOUT';

export type FeatureKey =
  | 'BASIC_CALCULATORS'
  | 'PDF_TOOLS'
  | 'IMAGE_TOOLS'
  | 'SELLER_EXTENSION'
  | 'AUTOFILL'
  | 'ADVANCED_SKU'
  | 'AI_TOOLS'
  | 'BULK_TOOLS'
  | 'MULTI_DEVICE'
  | 'TEAM_SUPPORT';

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  currency: string;
  durationDays: number; // 0 for lifetime
  maxDevices: number;
  features: FeatureKey[];
  active: boolean;
  description: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  status: 'ACTIVE' | 'SUSPENDED';
  role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  createdAt: string;
  updatedAt?: string;
}

export interface License {
  id: string;
  keyHash: string; // SHA-256 hash of license key
  keyMasked: string; // e.g. MGPRO-82A7-****-****
  planId: PlanId;
  userId: string;
  status: LicenseStatus;
  createdAt: string;
  expiresAt: string | null; // null for lifetime
  maxDevices: number;
  customerName?: string;
  customerEmail?: string;
  notes?: string;
}

export interface Device {
  id: string;
  licenseId: string;
  deviceIdentifier: string; // privacy-conscious hash
  deviceName: string;
  platform: string;
  extensionVersion: string;
  firstSeenAt: string;
  lastSeenAt: string;
  status: DeviceStatus;
}

export interface Activation {
  id: string;
  licenseId: string;
  deviceId: string;
  ipAddressHash?: string;
  userAgent?: string;
  timestamp: string;
}

export interface AuditLog {
  id: string;
  action: AuditAction;
  licenseId?: string;
  deviceId?: string;
  actorId?: string;
  actorType: 'SYSTEM' | 'ADMIN' | 'USER';
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface ExtensionVersion {
  version: string;
  minSupportedVersion: string;
  releaseNotes?: string;
  releasedAt: string;
  isDeprecated: boolean;
}

export interface SystemSetting {
  key: string;
  value: string;
  updatedAt: string;
}

// Product Storage Model (for Extension & Web)
export interface Product {
  id: string;
  title: string;
  description: string;
  sku: string;
  price: number;
  mrp: number;
  hsn: string;
  gst: number;
  brand: string;
  color: string;
  size: string;
  material: string;
  weight: string;
  category?: string;
  images?: string[];
  attributes?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

// API Contracts
export interface LicenseActivationRequest {
  licenseKey: string;
  deviceIdentifier: string;
  deviceName: string;
  platform: string;
  extensionVersion: string;
}

export interface LicenseActivationResponse {
  success: boolean;
  licenseStatus?: LicenseStatus;
  plan?: PlanId;
  expiresAt?: string | null;
  features?: FeatureKey[];
  authToken?: string; // Short-lived signed authorization token for offline caching
  offlineValidUntil?: string;
  error?: {
    code:
      | 'LICENSE_INVALID'
      | 'LICENSE_EXPIRED'
      | 'LICENSE_SUSPENDED'
      | 'LICENSE_REVOKED'
      | 'DEVICE_LIMIT_REACHED'
      | 'UPDATE_REQUIRED'
      | 'RATE_LIMITED'
      | 'SERVER_ERROR';
    message: string;
    currentDevices?: number;
    maxDevices?: number;
  };
}

export interface LicenseValidationRequest {
  licenseKey?: string;
  deviceIdentifier: string;
  authToken?: string;
  extensionVersion?: string;
}

export interface LicenseValidationResponse {
  success: boolean;
  licenseStatus: LicenseStatus;
  plan: PlanId;
  expiresAt: string | null;
  features: FeatureKey[];
  error?: {
    code: string;
    message: string;
  };
}

export interface DeviceDeactivateRequest {
  licenseKey: string;
  deviceIdentifier: string;
}

export interface DeviceDeactivateResponse {
  success: boolean;
  message: string;
}
