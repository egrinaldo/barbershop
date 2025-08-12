#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting custom build process...');

try {
  // Clean npm cache only
  console.log('🧹 Cleaning npm cache...');
  execSync('npm cache clean --force', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });

  // Build the project using react-scripts directly
  console.log('🏗️ Building the project...');
  execSync('npx react-scripts build', { 
    cwd: __dirname, 
    stdio: 'inherit',
    env: { ...process.env, GENERATE_SOURCEMAP: 'false' }
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error('Error details:', error);
  process.exit(1);
}