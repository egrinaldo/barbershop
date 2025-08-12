#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Running post-install fixes...');

try {
  // Force install compatible dependency versions
  const compatibleDeps = [
    'isexe@2.0.0',
    'which@2.0.2',
    'shebang-regex@3.0.0',
    'shebang-command@2.0.0',
    'cross-spawn@7.0.3'
  ];
  
  for (const dep of compatibleDeps) {
    console.log(`Installing ${dep}...`);
    try {
      execSync(`npm install ${dep} --force --no-save`, { 
        cwd: __dirname, 
        stdio: 'inherit' 
      });
    } catch (error) {
      console.warn(`Warning: Failed to install ${dep}:`, error.message);
    }
  }

  console.log('✅ Post-install fixes completed!');
} catch (error) {
  console.error('❌ Post-install failed:', error.message);
  // Don't exit with error to avoid breaking the build
}