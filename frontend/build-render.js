#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting custom build process...');

function checkDependency(moduleName) {
  const modulePath = path.join(__dirname, 'node_modules', moduleName);
  if (fs.existsSync(modulePath)) {
    try {
      const packageJsonPath = path.join(modulePath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        console.log(`✓ ${moduleName}@${packageJson.version} found`);
        return true;
      }
    } catch (error) {
      console.log(`⚠️ ${moduleName} found but version unknown`);
    }
  } else {
    console.log(`✗ ${moduleName} not found`);
  }
  return false;
}

try {
  // Wait a bit for postinstall to complete if it's still running
  console.log('⏳ Waiting for dependencies to be ready...');
  setTimeout(() => {}, 2000);

  // Check critical dependencies
  console.log('🔍 Checking dependencies...');
  const criticalDeps = ['isexe', 'which', 'shebang-regex', 'randombytes', 'leven', 'unique-string', 'tempy', 'temp-dir', 'is-number', 'to-regex-range', 'normalize-path', 'path-exists', 'react-scripts', 'ajv', 'ajv-keywords', 'schema-utils', 'terser-webpack-plugin', 'kleur', 'pkg-up'];
  for (const dep of criticalDeps) {
    checkDependency(dep);
  }

  // Clean npm cache
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
    env: { 
      ...process.env, 
      GENERATE_SOURCEMAP: 'false',
      NODE_ENV: 'production'
    }
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error('Error details:', error);
  process.exit(1);
}