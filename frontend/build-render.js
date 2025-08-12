#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Render build process...');

try {
  // Remove problematic files and directories
  console.log('🧹 Cleaning up...');
  const toRemove = ['node_modules', 'package-lock.json', '.npm'];
  toRemove.forEach(item => {
    const itemPath = path.join(__dirname, item);
    if (fs.existsSync(itemPath)) {
      console.log(`Removing ${item}...`);
      execSync(`rm -rf ${item}`, { cwd: __dirname });
    }
  });

  // Clean npm cache
  console.log('🗑️ Cleaning npm cache...');
  execSync('npm cache clean --force', { cwd: __dirname, stdio: 'inherit' });

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install --no-package-lock --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  // Force reinstall react-scripts
  console.log('🔧 Reinstalling react-scripts...');
  execSync('npm install react-scripts@5.0.1 --force', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });

  // Build the project
  console.log('🏗️ Building project...');
  execSync('npm run build', { 
    cwd: __dirname, 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production', GENERATE_SOURCEMAP: 'false' }
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}