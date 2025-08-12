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
  const criticalDependencies = ['isexe', 'which', 'shebang-regex', 'randombytes', 'leven', 'unique-string', 'tempy', 'temp-dir', 'is-number', 'to-regex-range', 'normalize-path', 'path-exists', 'react-scripts', 'ajv', 'ajv-keywords', 'schema-utils', 'terser-webpack-plugin', 'kleur', 'pkg-up', 'p-try', 'p-limit', 'p-locate', 'locate-path', 'glob-to-regexp', 'source-list-map', 'pkg-dir', 'find-cache-dir', 'util-deprecate', 'ts-interface-checker'];
  for (const dep of criticalDependencies) {
    checkDependency(dep);
  }

  // Clean npm cache
  console.log('🧹 Cleaning npm cache...');
  execSync('npm cache clean --force', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });

  // Install PostCSS dependencies before build
  console.log('📦 Installing PostCSS dependencies...');
  try {
    execSync('npm install postcss-selector-parser@6.0.10 @csstools/selector-specificity@2.0.2 @csstools/postcss-cascade-layers@3.0.0 postcss-preset-env@8.0.1 --no-save --legacy-peer-deps --force', {
      cwd: __dirname,
      stdio: 'inherit'
    });
  } catch (installError) {
    console.log('⚠️ PostCSS installation failed, continuing with build...');
  }

  // Build the project using react-scripts directly
  console.log('🏗️ Building the project...');
  try {
    execSync('npx react-scripts build', { 
      cwd: __dirname, 
      stdio: 'pipe',
      env: { 
        ...process.env, 
        GENERATE_SOURCEMAP: 'false',
        NODE_ENV: 'production'
      }
    });
  } catch (buildError) {
    console.error('❌ Build command failed with detailed error:');
    console.error('Exit code:', buildError.status);
    console.error('Signal:', buildError.signal);
    
    if (buildError.stdout) {
      console.error('STDOUT:');
      console.error(buildError.stdout.toString());
    }
    
    if (buildError.stderr) {
      console.error('STDERR:');
      console.error(buildError.stderr.toString());
    }
    
    // Try to extract missing module information
    const errorOutput = (buildError.stderr || buildError.stdout || '').toString();
    const moduleNotFoundMatch = errorOutput.match(/Cannot find module '([^']+)'/);
    if (moduleNotFoundMatch) {
      console.error(`🔍 Missing module detected: ${moduleNotFoundMatch[1]}`);
    }
    
    throw buildError;
  }

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error('Error details:', error);
  process.exit(1);
}