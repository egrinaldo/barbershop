#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Running post-install fixes...');

try {
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  
  // Remove problematic modules completely
  const problematicModules = ['isexe', 'which', 'shebang-regex', 'shebang-command', 'randombytes', 'serialize-javascript', 'leven', '@apideck/better-ajv-errors', 'unique-string', 'tempy'];
  
  for (const moduleName of problematicModules) {
    const modulePath = path.join(nodeModulesPath, moduleName);
    if (fs.existsSync(modulePath)) {
      console.log(`🗑️ Removing ${moduleName}...`);
      fs.rmSync(modulePath, { recursive: true, force: true });
    }
    
    // Also remove from nested node_modules
    const nestedPaths = [
      path.join(nodeModulesPath, 'cross-spawn', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'react-scripts', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'webpack', 'node_modules', moduleName)
    ];
    
    for (const nestedPath of nestedPaths) {
      if (fs.existsSync(nestedPath)) {
        console.log(`🗑️ Removing ${moduleName} from nested location...`);
        fs.rmSync(nestedPath, { recursive: true, force: true });
      }
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
  
  // Install randombytes (compatible version)
  execSync('npm install randombytes@2.1.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install serialize-javascript (compatible version)
  execSync('npm install serialize-javascript@6.0.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install leven (compatible version)
  execSync('npm install leven@3.1.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install @apideck/better-ajv-errors (compatible version)
  execSync('npm install @apideck/better-ajv-errors@0.3.6 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install unique-string (compatible version)
  execSync('npm install unique-string@2.0.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install tempy (compatible version)
  execSync('npm install tempy@1.0.1 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });

  console.log('✅ Post-install fixes completed!');
} catch (error) {
  console.error('❌ Post-install fixes failed:', error.message);
  // Don't exit with error to avoid breaking the build
}