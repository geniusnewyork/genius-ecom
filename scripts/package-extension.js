// Scripts: package-extension.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const extDir = path.resolve(rootDir, 'apps/extension');
const distDir = path.resolve(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const zipPath = path.resolve(distDir, 'monty-genius-seller-assistant-v1.0.0.zip');
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

console.log('[MONTY GENIUS] Packaging production Chrome Extension...');
console.log('Source:', extDir);
console.log('Destination:', zipPath);

try {
  // Use powershell Compress-Archive
  execSync(
    `powershell -Command "Compress-Archive -Path '${extDir}\\*' -DestinationPath '${zipPath}' -Force"`,
    { stdio: 'inherit' }
  );
  console.log('✅ Chrome Web Store ZIP package generated successfully:', zipPath);
} catch (err) {
  console.error('Failed to create extension zip:', err.message);
}
