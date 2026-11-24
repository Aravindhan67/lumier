import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDir = path.resolve(__dirname, '../client');

console.log('🚀 Executing Render build step for LUMIÈRE Platform...');

if (fs.existsSync(clientDir) && fs.existsSync(path.join(clientDir, 'package.json'))) {
  console.log('📦 Client directory detected. Installing client packages and building Vite distribution...');
  try {
    execSync('npm install', { cwd: clientDir, stdio: 'inherit' });
    execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });
    console.log('✅ Client Vite bundle built successfully!');
  } catch (err) {
    console.error('⚠️ Warning during client build:', err.message);
  }
} else {
  console.log('ℹ️ Running in standalone API mode.');
}

console.log('✨ Build finished successfully.');
process.exit(0);
