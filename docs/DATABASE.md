# MONTY GENIUS DATABASE ARCHITECTURE & SCHEMA

> **Product:** MONTY GENIUS ECOM TOOLS — Commercial Edition  
> **Brand:** MONTY GENIUS  
> **Footer:** Designed with ❤️ by Mr. Monty Genius  

---

## 1. Database Abstraction Layer

The licensing engine uses a decoupled database interface (`DatabaseEngine` in `services/license-api/src/db/index.js`).

### Storage Engines Supported:
1. **Development & Self-Hosted:** High-speed ACID file-backed JSON/SQLite database stored at `services/license-api/data/license_db.json`. Writes are performed atomically using temporary files and atomic file renames.
2. **Production Cloud:** Easily swappable with PostgreSQL or Cloudflare D1 by configuring the database adapter interface without altering application logic.

---

## 2. Relational Schema & Entities

### 2.1 Users (`users`)
Stores administrative and customer credentials.
| Field | Type | Description |
|---|---|---|
| `id` | String | Unique user ID (`usr_...`) |
| `email` | String | Unique login email |
| `name` | String | Full user name |
| `passwordHash` | String | PBKDF2 salted hash |
| `role` | String | `SUPER_ADMIN`, `ADMIN`, `SUPPORT`, or `USER` |
| `status` | String | `ACTIVE` or `SUSPENDED` |
| `createdAt` | ISO Timestamp | Registration timestamp |

### 2.2 Plans (`plans`)
Configurable commercial subscription tiers.
| Field | Type | Description |
|---|---|---|
| `id` | String | `FREE`, `PRO`, `BUSINESS`, `LIFETIME` |
| `name` | String | Display name |
| `price` | Number | Cost in target currency (e.g., 499) |
| `currency` | String | Currency code (`INR`, `USD`) |
| `durationDays` | Number | Validity in days (0 for lifetime) |
| `maxDevices` | Number | Allowed concurrent workstation seats |
| `features` | Array<String> | Feature keys entitled to this plan |
| `active` | Boolean | Whether plan is purchasable |

### 2.3 Licenses (`licenses`)
Core license records.
| Field | Type | Description |
|---|---|---|
| `id` | String | License ID (`lic_...`) |
| `keyHash` | String | SHA-256 hash of plaintext key |
| `keyMasked` | String | Display string (e.g. `MGPRO-82A7-****-****`) |
| `planId` | String | Target plan ID |
| `userId` | String | Owner identifier or email |
| `status` | String | `ACTIVE`, `EXPIRED`, `SUSPENDED`, `REVOKED` |
| `maxDevices` | Number | Allowed workstation seats |
| `createdAt` | ISO Timestamp | Issuance timestamp |
| `expiresAt` | ISO Timestamp | Expiration timestamp (null if lifetime) |
| `customerName`| String | Customer name |
| `customerEmail`| String | Customer email |
| `notes` | String | Order reference or notes |

### 2.4 Devices (`devices`)
Seller workstations registered to license seats.
| Field | Type | Description |
|---|---|---|
| `id` | String | Device record ID |
| `licenseId` | String | Foreign key to `licenses.id` |
| `deviceIdentifier` | String | Installation token (`dev_...`) |
| `deviceName` | String | User friendly device name |
| `platform` | String | OS / Platform string |
| `extensionVersion` | String | Active extension version |
| `firstSeenAt` | ISO Timestamp | First connection date |
| `lastSeenAt` | ISO Timestamp | Heartbeat timestamp |
| `status` | String | `ACTIVE` or `INACTIVE` |

### 2.5 Activations (`activations`)
Audit log of activation requests for rate-limiting and security analysis.

### 2.6 Audit Logs (`auditLogs`)
Immutable security history of all administrative and lifecycle operations.

---

## 3. Database Seeding & Migrations

To re-seed or initialize the database:
```powershell
npm --prefix services/license-api run seed
```

This ensures default plans, development test licenses, and the initial administrator account exist.

---

## 4. Backup & Disaster Recovery

Because all records are stored in `services/license-api/data/license_db.json`:
- **Backup:** Copy `services/license-api/data/` to a secure encrypted backup destination.
- **Restore:** Place `license_db.json` back into `services/license-api/data/` and restart the License API.
