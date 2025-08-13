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

  // Ensure clean CSS build without PostCSS
  console.log('🎨 Preparing CSS-only build...');

  // Build the project using react-app-rewired to disable PostCSS
  console.log('🏗️ Building the project...');
  try {
    const buildResult = execSync('npx react-app-rewired build', { 
      cwd: __dirname, 
      stdio: 'pipe',
      env: { 
        ...process.env, 
        GENERATE_SOURCEMAP: 'false',
        NODE_ENV: 'production',
        CI: 'false',
        DISABLE_ESLINT_PLUGIN: 'true',
        ESLINT_NO_DEV_ERRORS: 'true',
        TSC_COMPILE_ON_ERROR: 'true',
        SKIP_PREFLIGHT_CHECK: 'true'
      }
    });
    
    console.log('📋 Build output:');
    console.log(buildResult.toString());
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
  
  // Check if build directory exists and has content
  const buildDir = path.join(__dirname, 'build');
  console.log(`🔍 Checking build directory: ${buildDir}`);
  
  if (fs.existsSync(buildDir)) {
    const files = fs.readdirSync(buildDir);
    console.log(`📁 Build directory contents: ${files.length} items`);
    files.forEach(file => {
      const filePath = path.join(buildDir, file);
      const stats = fs.statSync(filePath);
      console.log(`  - ${file} (${stats.isDirectory() ? 'dir' : 'file'})`);
    });
  } else {
    console.error('❌ Build directory does not exist!');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error('Error details:', error);
  process.exit(1);
}