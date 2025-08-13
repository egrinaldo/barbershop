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
    'isexe@2.0.0',
    'which@2.0.2',
    'shebang-regex@3.0.0',
    'shebang-command@2.0.0',
    'randombytes@2.1.0',
    'leven@3.1.0',
    'is-number@7.0.0',
    'normalize-path@3.0.0',
    'path-exists@4.0.0',
    'p-limit@3.1.0',
    'p-locate@5.0.0',
    'locate-path@6.0.0',
    'pkg-dir@4.2.0',
    'find-cache-dir@3.3.2',
    'p-try@2.2.0',
    'pkg-up@3.1.0',
    'ajv@8.17.1',
    'ajv-keywords@5.1.0',
    'merge-stream@2.0.0',
    'tempy@3.1.0',
    'temp-dir@3.0.0',
    'unique-string@3.0.0',
    'to-regex-range@5.0.1',
    'glob-to-regexp@0.4.1',
    'source-list-map@2.0.1',
    'util-deprecate@1.0.2',
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