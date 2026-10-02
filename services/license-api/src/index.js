// MONTY GENIUS LICENSE API — Entrypoint

import { runSeed } from './db/seed.js';
import { startServer } from './server.js';

// Auto-seed if database empty
runSeed();

// Start HTTP server on port 3001
const PORT = process.env.PORT || 3001;
startServer(PORT);
