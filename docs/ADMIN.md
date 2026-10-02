# MONTY GENIUS ADMIN CONTROL CENTER DOCUMENTATION

> **Product:** MONTY GENIUS ECOM TOOLS — Commercial Edition  
> **Brand:** MONTY GENIUS  
> **Footer:** Designed with ❤️ by Mr. Monty Genius  

---

## 1. Overview & Security Foundation

The **MONTY GENIUS Admin Control Center** (`apps/admin`) is a commercial-grade management interface for platform administrators.

### Key Security Standards:
1. **Server-Side Authentication:** No frontend hardcoded passwords. Authentication is handled by `POST /api/v1/admin/auth/login`.
2. **Password Hashing:** Stored with salted PBKDF2 with 10,000 iterations.
3. **Session Token Expiry:** 24-hour cryptographically secure Bearer session tokens.
4. **Rate Limiting:** Protects the login endpoint against automated brute-force attacks (max 10 attempts/minute).
5. **Role-Based Access Control:** Differentiates `SUPER_ADMIN`, `ADMIN`, and `SUPPORT`.

---

## 2. Admin Modules

### 2.1 Overview Dashboard (`/`)
Displays real, calculated database metrics:
- **Active Licenses** vs Total Issued Licenses
- **Connected Workstation Devices** across all active subscriptions
- **Estimated Platform Turnover (₹)**
- **Suspended & Expired Subscriptions**
- **Live Feed of Recent Activations**

### 2.2 License Management (`/licenses`)
- **Search & Filter:** Find licenses by key hash, customer name, email, or status.
- **Generate License Modal:** Select plan (Pro, Business, Lifetime), custom validity days, and device limits. Generates a fresh `MGPRO-` / `MGBIZ-` key and presents the plaintext key to the administrator to copy and dispatch.
- **Actions:**
  - **Extend Expiry:** Add custom days (e.g., +30 days) to active or expired licenses.
  - **Reset Device Seats:** Disconnects all workstations on a license so a customer can register a new laptop.
  - **Suspend:** Temporarily freezes customer access without destroying data.
  - **Revoke:** Permanently terminates a fraudulent or refunded license.
  - **Reactivate:** Restores suspended or revoked licenses.

### 2.3 Connected Devices Explorer (`/devices`)
Lists all active seller workstations with:
- Installation Identifier (`dev_...`)
- Device Name (e.g. `Windows Laptop (fe41)`)
- Operating Platform (`Win32`, `MacIntel`, `Linux`)
- Installed Extension Version (`v1.0.0`)
- Real-time `Last Seen` timestamp

### 2.4 Plans & Pricing Configuration (`/plans`)
Allows administrators to update plan prices, seat allowances, and active feature flags without redeploying frontend or extension code.

### 2.5 Security Audit Logs (`/audit-logs`)
Chronological tracking of sensitive platform events:
- `LICENSE_CREATED`
- `LICENSE_ACTIVATED`
- `DEVICE_ACTIVATED`
- `DEVICE_DEACTIVATED`
- `LICENSE_SUSPENDED`
- `LICENSE_EXTENDED`
- `ADMIN_LOGIN`

### 2.6 Extension Version Governance (`/versions`)
Controls the minimum supported extension version and latest version. If a seller runs an extension version below the configured threshold, the License API returns `UPDATE_REQUIRED`.
