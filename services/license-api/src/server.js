// MONTY GENIUS LICENSE API — Server & Router

import http from 'http';
import { URL } from 'url';
import { db } from './db/index.js';
import { LicenseService } from './license/service.js';
import { AdminService } from './admin/service.js';
import { authenticateAdminCredentials, createAdminSession, verifyAdminSession, revokeAdminSession } from './admin/auth.js';
import { activePaymentProvider } from './payments/provider.js';
import { rateLimit } from './middleware/rateLimiter.js';

const PORT = process.env.PORT || 3001;
const activationLimiter = rateLimit(30, 60000); // 30 activations/min
const loginLimiter = rateLimit(10, 60000); // 10 login attempts/min

export function createServer() {
  return http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // Helper functions
    const sendJson = (statusCode, data) => {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    };

    const getBody = () => {
      return new Promise((resolve) => {
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', () => {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch {
            resolve({});
          }
        });
      });
    };

    const getAdminSession = () => {
      const auth = req.headers['authorization'];
      if (!auth || !auth.startsWith('Bearer ')) return null;
      const token = auth.slice(7);
      return verifyAdminSession(token);
    };

    try {
      // --- Public Endpoints ---
      if (pathname === '/api/v1/health' && req.method === 'GET') {
        return sendJson(200, { status: 'healthy', timestamp: new Date().toISOString() });
      }

      if (pathname === '/api/v1/plans' && req.method === 'GET') {
        return sendJson(200, { success: true, plans: db.getPlans() });
      }

      if (pathname === '/api/v1/version' && req.method === 'GET') {
        const config = db.getExtensionVersionConfig();
        return sendJson(200, { success: true, ...config });
      }

      // --- License Endpoints ---
      if (pathname === '/api/v1/license/activate' && req.method === 'POST') {
        return activationLimiter(req, res, async () => {
          const body = await getBody();
          const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
          const result = await LicenseService.activate({ ...body, ipAddress: ip });
          return sendJson(result.success ? 200 : 400, result);
        });
      }

      if (pathname === '/api/v1/license/validate' && req.method === 'POST') {
        const body = await getBody();
        const result = await LicenseService.validate(body);
        return sendJson(result.success ? 200 : 400, result);
      }

      if (pathname === '/api/v1/license/deactivate-device' && req.method === 'POST') {
        const body = await getBody();
        const result = await LicenseService.deactivateDevice(body);
        return sendJson(result.success ? 200 : 400, result);
      }

      // --- Payment Abstraction Endpoints ---
      if (pathname === '/api/v1/payments/create-order' && req.method === 'POST') {
        const body = await getBody();
        const result = await activePaymentProvider.createOrder(body);
        return sendJson(200, result);
      }

      if (pathname === '/api/v1/payments/verify' && req.method === 'POST') {
        const body = await getBody();
        const result = await activePaymentProvider.verifyPayment(body);
        return sendJson(200, result);
      }

      // --- Admin Auth Endpoints ---
      if (pathname === '/api/v1/admin/auth/login' && req.method === 'POST') {
        return loginLimiter(req, res, async () => {
          const body = await getBody();
          const user = authenticateAdminCredentials(body.email, body.password);
          if (!user) {
            return sendJson(401, {
              success: false,
              error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' },
            });
          }
          const session = createAdminSession(user);
          db.addAuditLog({
            action: 'ADMIN_LOGIN',
            actorId: user.email,
            actorType: 'ADMIN',
          });
          return sendJson(200, {
            success: true,
            token: session.token,
            user: { id: user.id, email: user.email, role: user.role, name: user.name },
          });
        });
      }

      if (pathname === '/api/v1/admin/auth/logout' && req.method === 'POST') {
        const auth = req.headers['authorization'];
        if (auth && auth.startsWith('Bearer ')) {
          revokeAdminSession(auth.slice(7));
        }
        return sendJson(200, { success: true });
      }

      if (pathname === '/api/v1/admin/auth/me' && req.method === 'GET') {
        const session = getAdminSession();
        if (!session) {
          return sendJson(401, { success: false, error: { code: 'UNAUTHORIZED', message: 'Session expired' } });
        }
        return sendJson(200, { success: true, session });
      }

      // --- Protected Admin Endpoints ---
      if (pathname.startsWith('/api/v1/admin/')) {
        const session = getAdminSession();
        if (!session) {
          return sendJson(401, {
            success: false,
            error: { code: 'UNAUTHORIZED', message: 'Admin authentication required.' },
          });
        }

        if (pathname === '/api/v1/admin/dashboard/stats' && req.method === 'GET') {
          const stats = AdminService.getDashboardStats();
          return sendJson(200, { success: true, stats });
        }

        if (pathname === '/api/v1/admin/licenses' && req.method === 'GET') {
          const licenses = db.getLicenses();
          return sendJson(200, { success: true, licenses });
        }

        if (pathname === '/api/v1/admin/licenses' && req.method === 'POST') {
          const body = await getBody();
          const created = AdminService.createLicense({ ...body, adminId: session.email });
          return sendJson(201, { success: true, license: created });
        }

        if (pathname.match(/^\/api\/v1\/admin\/licenses\/[a-zA-Z0-9_-]+$/) && req.method === 'PATCH') {
          const id = pathname.split('/').pop();
          const body = await getBody();
          const updated = AdminService.updateLicenseStatus(id, body.status, session.email, body.reason);
          return sendJson(200, { success: true, license: updated });
        }

        if (pathname.match(/^\/api\/v1\/admin\/licenses\/[a-zA-Z0-9_-]+\/extend$/) && req.method === 'POST') {
          const id = pathname.split('/')[5];
          const body = await getBody();
          const updated = AdminService.extendLicense(id, Number(body.days) || 30, session.email);
          return sendJson(200, { success: true, license: updated });
        }

        if (pathname.match(/^\/api\/v1\/admin\/licenses\/[a-zA-Z0-9_-]+\/reset-devices$/) && req.method === 'POST') {
          const id = pathname.split('/')[5];
          const resReset = AdminService.resetDevices(id, session.email);
          return sendJson(200, { success: true, ...resReset });
        }

        if (pathname === '/api/v1/admin/devices' && req.method === 'GET') {
          const devices = db.getDevices();
          return sendJson(200, { success: true, devices });
        }

        if (pathname === '/api/v1/admin/audit-logs' && req.method === 'GET') {
          const logs = db.getAuditLogs(100);
          return sendJson(200, { success: true, auditLogs: logs });
        }

        if (pathname === '/api/v1/admin/plans' && req.method === 'GET') {
          return sendJson(200, { success: true, plans: db.getPlans() });
        }

        if (pathname.match(/^\/api\/v1\/admin\/plans\/[a-zA-Z0-9_-]+$/) && req.method === 'PUT') {
          const body = await getBody();
          const saved = db.savePlan(body);
          return sendJson(200, { success: true, plan: saved });
        }

        if (pathname === '/api/v1/admin/versions' && req.method === 'GET') {
          return sendJson(200, { success: true, ...db.getExtensionVersionConfig() });
        }

        if (pathname === '/api/v1/admin/versions' && req.method === 'PUT') {
          const body = await getBody();
          if (body.minSupportedVersion) db.setSystemSetting('minSupportedExtensionVersion', body.minSupportedVersion);
          if (body.latestVersion) db.setSystemSetting('latestExtensionVersion', body.latestVersion);
          return sendJson(200, { success: true, ...db.getExtensionVersionConfig() });
        }
      }

      // 404 Fallback
      return sendJson(404, {
        success: false,
        error: { code: 'NOT_FOUND', message: 'API route not found' },
      });
    } catch (err) {
      console.error('[API ERROR]', err);
      return sendJson(500, {
        success: false,
        error: { code: 'SERVER_ERROR', message: 'An internal server error occurred.' },
      });
    }
  });
}

export function startServer(port = PORT) {
  const server = createServer();
  server.listen(port, () => {
    console.log(`[MONTY GENIUS] License API v1 running on http://localhost:${port}`);
  });
  return server;
}
