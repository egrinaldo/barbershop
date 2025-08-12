#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Running post-install fixes...');

try {
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  
  // Remove problematic modules completely
  const problematicModules = ['isexe', 'which', 'shebang-regex', 'shebang-command'];
  
  for (const moduleName of problematicModules) {
    const modulePath = path.join(nodeModulesPath, moduleName);
    if (fs.existsSync(modulePath)) {
      console.log(`🗑️ Removing ${moduleName}...`);
      fs.rmSync(modulePath, { recursive: true, force: true });
    }
    
    // Also remove from cross-spawn's node_modules if it exists
    const crossSpawnModulePath = path.join(nodeModulesPath, 'cross-spawn', 'node_modules', moduleName);
    if (fs.existsSync(crossSpawnModulePath)) {
      console.log(`🗑️ Removing ${moduleName} from cross-spawn...`);
      fs.rmSync(crossSpawnModulePath, { recursive: true, force: true });
    }
  }

  // Install specific compatible versions
  console.log('📦 Installing compatible versions...');
  
  // Install isexe@2.0.0 (CommonJS compatible)
  execSync('npm install isexe@2.0.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install which@2.0.2 (compatible with isexe@2.0.0)
  execSync('npm install which@2.0.2 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install shebang packages
  execSync('npm install shebang-regex@3.0.0 shebang-command@2.0.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });

  console.log('✅ Post-install fixes completed!');
} catch (error) {
  console.error('❌ Post-install fixes failed:', error.message);
  // Don't exit with error to avoid breaking the build
}