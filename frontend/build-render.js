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

  // Force reinstall problematic dependencies with compatible versions
  console.log('🔧 Installing compatible dependency versions...');
  const compatibleDeps = [
    'shebang-regex@3.0.0',
    'shebang-command@2.0.0',
    'isexe@2.0.0',
    'which@2.0.2',
    'cross-spawn@7.0.3',
    'react-scripts@5.0.1'
  ];
  
  for (const dep of compatibleDeps) {
    console.log(`Installing ${dep}...`);
    execSync(`npm install ${dep} --force`, { 
      cwd: __dirname, 
      stdio: 'inherit' 
    });
  }

  // Build the project using react-scripts directly
  console.log('🏗️ Building the project...');
  execSync('npx react-scripts build', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error('Error details:', error);
  process.exit(1);
}