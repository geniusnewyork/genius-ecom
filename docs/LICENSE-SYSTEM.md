# MONTY GENIUS LICENSE SYSTEM ARCHITECTURE

> **Product:** MONTY GENIUS ECOM TOOLS — Commercial Edition  
> **Brand:** MONTY GENIUS  
> **Footer:** Designed with ❤️ by Mr. Monty Genius  

---

## 1. Architectural Philosophy & Zero Master Secrets in Client

A critical security principle of commercial browser extensions is that **client-side extension code cannot be trusted to enforce licensing rules independently** without backend authorization.

```text
Chrome Extension (Client)
       │
       │ HTTPS /api/v1/license/activate
       ▼
License API (Server-Side)
       │
       ├─► Cryptographic SHA-256 Hash Matching
       ├─► Expiry & Plan Status Checks
       ├─► Device Seat Count Checks (maxDevices)
       ▼
Signed Offline Authorization Token (HMAC-SHA256)
```

1. **No Plaintext Keys in Database:** The License API never stores unhashed license keys. Keys are hashed with SHA-256 (`keyHash`) and masked for display (`MGPRO-82A7-****-****`).
2. **No Master Secrets in Extension:** The extension contains zero signing secrets or database credentials. It only receives short-lived signed tokens.
3. **Owner Free Mode (Development Bypass):** Controlled exclusively by environment configuration (`APP_ENV=development` / `LICENSE_REQUIRED=false`). The production build enforces strict backend authorization.

---

## 2. License Key Cryptographic Format

Keys are generated using cryptographically secure random entropy (`crypto.randomBytes`):

```text
[PLAN_PREFIX]-[BLOCK_1]-[BLOCK_2]-[BLOCK_3]
```

- **Seller Pro:** `MGPRO-B4A1-89CE-21F0`
- **Business Growth:** `MGBIZ-78F2-A419-C03E`
- **Lifetime Founder:** `MGLIFE-99E1-44B2-11D9`
- **Development Testing:** `MGDEV-PRO-7890-ABCD`

Each key block consists of 4 uppercase alphanumeric characters with high entropy, preventing key enumeration or brute-force guessing attacks.

---

## 3. Device Seat Enforcement (Privacy-Conscious)

### Installation Identifier
Instead of collecting invasive hardware identifiers (MAC addresses, motherboard UUIDs) which violate user privacy:
1. When installed, the extension generates a unique 32-character installation token:
   ```text
   dev_e82a93f1bc0472da9a102c84279bfe41
   ```
2. The installation token is tied to a friendly name (e.g. `Windows Laptop (fe41)`).
3. The server tracks active devices per license.

### Device Limits by Plan
- **Free:** 1 Device
- **Pro:** 2 Devices
- **Business:** 5 Devices
- **Lifetime:** 3 Devices (Configurable)

### Device Limit Reached Flow
If a user tries to activate a 3rd device on a 2-device Pro license, the License API rejects the request:
```json
{
  "success": false,
  "error": {
    "code": "DEVICE_LIMIT_REACHED",
    "message": "You have reached your plan device limit (2 / 2). Disconnect an old workstation seat from settings or upgrade your plan.",
    "currentDevices": 2,
    "maxDevices": 2
  }
}
```

---

## 4. Disconnecting a Device & New Laptop Migration

When a seller gets a new laptop:
1. **Self-Service Disconnect:** From the old laptop's extension Settings -> **License & Devices**, click **Disconnect Device (Free Seat)**.
2. The server calls `POST /api/v1/license/deactivate-device`, marking the device seat as `INACTIVE`.
3. The seller can now immediately activate the license key on their new laptop.
4. **Admin Reset:** If an old laptop was lost or broken, an administrator can click **Reset Devices** in the Admin Portal to clear all device seats instantly.

---

## 5. Offline Resilience & Signed Tokens

To ensure sellers are never blocked when packing orders during network outages:
1. Upon successful online activation, the License API generates a signed HMAC-SHA256 authorization token:
   ```text
   [base64Url_Payload].[HMAC_SHA256_Signature]
   ```
2. The token is valid for a configured grace period (default: **72 hours**).
3. If an internet request fails, the extension verifies the cached authorization token locally and continues functioning seamlessly.
4. Once internet connectivity is restored, the extension re-validates against the server.
