#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Running simplified post-install fixes...');

try {
  // Simplified approach - only install essential missing dependencies
  console.log('📦 Installing essential dependencies...');
  // Only install the most essential dependencies that are actually missing
  const essentialDeps = [
    'merge-stream@2.0.0',
    'tempy@3.1.0', 
    'kleur@4.1.5',
    'ts-interface-checker@1.0.2'
  ];
  
  for (const dep of essentialDeps) {
    try {
      console.log(`📦 Installing ${dep}...`);
      execSync(`npm install ${dep} --no-save --legacy-peer-deps`, { 
        cwd: __dirname, 
        stdio: 'inherit' 
      });
    } catch (error) {
      console.log(`⚠️ Failed to install ${dep}, continuing...`);
    }
  }
  
  console.log('✅ Simplified post-install fixes completed!');
} catch (error) {
  console.error('❌ Post-install fixes failed:', error.message);
  // Don't exit with error to avoid breaking the build
}