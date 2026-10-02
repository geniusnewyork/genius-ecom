// MONTY GENIUS LICENSE API — Admin Authentication

import crypto from 'crypto';
import { db } from '../db/index.js';

const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'mg_sec_admin_session_auth_token_vault_2026';
const sessions = new Map(); // token -> { userId, role, expiresAt }

export function hashPassword(password, salt = 'mg_salt_auth_2026') {
  return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('hex');
}

export function createAdminSession(user) {
  const token = 'mgsess_' + crypto.randomBytes(24).toString('hex');
  const expiresAt = Date.now() + 24 * 3600 * 1000; // 24 hours

  sessions.set(token, {
    userId: user.id,
    email: user.email,
    role: user.role || 'ADMIN',
    expiresAt,
  });

  return { token, expiresAt };
}

export function verifyAdminSession(token) {
  if (!token) return null;
  const sess = sessions.get(token);
  if (!sess) return null;

  if (Date.now() > sess.expiresAt) {
    sessions.delete(token);
    return null;
  }

  return sess;
}

export function revokeAdminSession(token) {
  if (token) sessions.delete(token);
  return true;
}

export function authenticateAdminCredentials(email, password) {
  const user = db.getUserByEmail(email);
  if (!user) return null;

  const inputHash = hashPassword(password);
  if (user.passwordHash !== inputHash) {
    return null;
  }

  return user;
}
