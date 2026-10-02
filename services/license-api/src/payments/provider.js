// MONTY GENIUS LICENSE API — Payment Gateway Abstraction Interface

import crypto from 'crypto';
import { AdminService } from '../admin/service.js';

/**
 * Base Payment Provider Interface
 */
export class PaymentProvider {
  constructor(name) {
    this.name = name;
  }

  async createOrder({ planId, amount, currency, customerEmail, customerName }) {
    throw new Error('createOrder() not implemented');
  }

  async verifyPayment(paymentDetails) {
    throw new Error('verifyPayment() not implemented');
  }

  async handleWebhook(headers, body) {
    throw new Error('handleWebhook() not implemented');
  }
}

/**
 * Mock / Test Payment Provider
 * Demonstrates the full automated server-side verification and license issuance cycle.
 */
export class MockPaymentProvider extends PaymentProvider {
  constructor() {
    super('mock');
  }

  async createOrder({ planId, amount, currency, customerEmail, customerName }) {
    const orderId = 'order_mock_' + crypto.randomBytes(8).toString('hex');
    return {
      success: true,
      orderId,
      amount,
      currency: currency || 'INR',
      planId,
      customerEmail,
      customerName,
      status: 'CREATED',
    };
  }

  async verifyPayment({ orderId, paymentId, signature, planId, customerEmail, customerName }) {
    // In production, verify HMAC signature from Razorpay / Stripe
    console.log(`[PAYMENT] Server-side verifying payment ${paymentId} for order ${orderId}...`);

    // Automatic license generation upon verified payment
    const newLicense = AdminService.createLicense({
      planId: planId || 'PRO',
      customerName: customerName || 'New Subscriber',
      customerEmail: customerEmail || 'customer@example.com',
      notes: `Automated order: ${orderId} | Payment: ${paymentId}`,
      adminId: 'SYSTEM_PAYMENT_WEBHOOK',
    });

    return {
      success: true,
      verified: true,
      orderId,
      paymentId,
      licenseKey: newLicense.plainLicenseKey,
      planId: newLicense.planId,
      expiresAt: newLicense.expiresAt,
    };
  }

  async handleWebhook(headers, body) {
    console.log('[PAYMENT WEBHOOK] Processing provider webhook notification...');
    return { received: true };
  }
}

export const activePaymentProvider = new MockPaymentProvider();
