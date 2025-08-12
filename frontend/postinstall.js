#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Running post-install fixes...');

try {
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  
  // Remove problematic modules completely
  const problematicModules = ['isexe', 'which', 'shebang-regex', 'shebang-command', 'randombytes', 'serialize-javascript', 'leven', '@apideck/better-ajv-errors', 'unique-string', 'tempy', 'temp-dir', 'workbox-build', 'is-number', 'to-regex-range', 'fill-range', 'micromatch', 'normalize-path', 'eslint-webpack-plugin', 'path-exists', 'find-up', 'react-dev-utils', 'ajv', 'ajv-keywords', 'schema-utils', 'terser-webpack-plugin', 'kleur', 'pkg-up', 'p-try', 'p-limit', 'p-locate', 'locate-path'];
  
  for (const moduleName of problematicModules) {
    const modulePath = path.join(nodeModulesPath, moduleName);
    if (fs.existsSync(modulePath)) {
      console.log(`🗑️ Removing ${moduleName}...`);
      fs.rmSync(modulePath, { recursive: true, force: true });
    }
    
    // Also remove from nested node_modules (more comprehensive search)
    const nestedPaths = [
      path.join(nodeModulesPath, 'cross-spawn', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'react-scripts', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'react-dev-utils', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'webpack', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'find-up', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'ajv-keywords', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'schema-utils', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'terser-webpack-plugin', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'browserslist', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'pkg-up', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'p-limit', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'p-locate', 'node_modules', moduleName),
      path.join(nodeModulesPath, 'locate-path', 'node_modules', moduleName)
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
  
  // Install temp-dir (compatible version)
  execSync('npm install temp-dir@2.0.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install workbox-build (compatible version)
  execSync('npm install workbox-build@6.6.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install is-number (compatible version)
  execSync('npm install is-number@7.0.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install to-regex-range (compatible version)
  execSync('npm install to-regex-range@5.0.1 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install fill-range (compatible version)
  execSync('npm install fill-range@7.0.1 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install micromatch (compatible version)
  execSync('npm install micromatch@4.0.5 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install normalize-path (compatible version)
  execSync('npm install normalize-path@3.0.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install eslint-webpack-plugin (compatible version)
  execSync('npm install eslint-webpack-plugin@3.2.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install path-exists (compatible version)
  execSync('npm install path-exists@4.0.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install find-up (compatible version)
  execSync('npm install find-up@5.0.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install react-dev-utils (compatible version)
  execSync('npm install react-dev-utils@12.0.1 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install ajv (compatible version)
  execSync('npm install ajv@8.12.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install ajv-keywords (compatible version)
  execSync('npm install ajv-keywords@5.1.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install schema-utils (compatible version)
  execSync('npm install schema-utils@4.2.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install terser-webpack-plugin (compatible version)
  execSync('npm install terser-webpack-plugin@5.3.9 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install kleur (compatible version)
  execSync('npm install kleur@4.1.5 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install pkg-up (compatible version)
  execSync('npm install pkg-up@3.1.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install p-try (compatible version)
  execSync('npm install p-try@2.2.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install p-limit (compatible version)
  execSync('npm install p-limit@2.3.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install p-locate (compatible version)
  execSync('npm install p-locate@4.1.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  // Install locate-path (compatible version)
  execSync('npm install locate-path@5.0.0 --no-save --legacy-peer-deps', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });

  console.log('✅ Post-install fixes completed!');
} catch (error) {
  console.error('❌ Post-install fixes failed:', error.message);
  // Don't exit with error to avoid breaking the build
}