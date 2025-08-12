#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Running post-install fixes...');

try {
  // Check if problematic modules exist and log their versions
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  const problematicModules = ['isexe', 'which', 'shebang-regex', 'shebang-command', 'cross-spawn'];
  
  for (const moduleName of problematicModules) {
    const modulePath = path.join(nodeModulesPath, moduleName);
    if (fs.existsSync(modulePath)) {
      try {
        const packageJsonPath = path.join(modulePath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          console.log(`✓ ${moduleName}@${packageJson.version} installed`);
        }
      } catch (error) {
        console.log(`? ${moduleName} found but version unknown`);
      }
    } else {
      console.log(`✗ ${moduleName} not found`);
    }
  }

  console.log('✅ Post-install check completed!');
} catch (error) {
  console.error('❌ Post-install check failed:', error.message);
  // Don't exit with error to avoid breaking the build
}