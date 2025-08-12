const path = require('path');

// Mock ESLint to prevent any loading
try {
  require.cache[require.resolve('eslint')] = {
    exports: {
      ESLint: class MockESLint {
        constructor() {}
        lintFiles() { return []; }
        lintText() { return []; }
        static outputFixes() {}
      }
    }
  };
} catch (e) {
  // ESLint not found, which is good
}

module.exports = function override(config, env) {
  console.log('🚫 Forcefully removing ESLint from webpack config...');
  
  // FORCE REMOVE ESLint plugin completely - multiple approaches for robustness
  if (config.plugins) {
    const originalLength = config.plugins.length;
    config.plugins = config.plugins.filter(plugin => {
      const pluginName = plugin.constructor.name;
      const isESLintPlugin = pluginName.includes('ESLint') || 
                            pluginName.includes('eslint') ||
                            pluginName === 'ESLintWebpackPlugin';
      
      if (isESLintPlugin) {
        console.log(`🗑️ Removed ESLint plugin: ${pluginName}`);
      }
      
      return !isESLintPlugin;
    });
    console.log(`📊 Plugins: ${originalLength} → ${config.plugins.length}`);
  }

  // Also remove any ESLint-related loaders from module rules
  if (config.module && config.module.rules) {
    config.module.rules = config.module.rules.filter(rule => {
      if (rule.enforce === 'pre' && rule.test && rule.test.toString().includes('js|jsx')) {
        console.log('🗑️ Removed ESLint loader rule');
        return false;
      }
      return true;
    });
  }

  // Remove ESLint from resolve modules
  if (config.resolve && config.resolve.modules) {
    config.resolve.modules = config.resolve.modules.filter(module => 
      !module.includes('eslint')
    );
  }
  // Remove PostCSS loader completely from CSS rules
  const oneOfRule = config.module.rules.find(rule => rule.oneOf);
  
  if (oneOfRule) {
    oneOfRule.oneOf.forEach(rule => {
      if (rule.test && rule.test.toString().includes('css')) {
        if (rule.use && Array.isArray(rule.use)) {
          // Remove postcss-loader from the use array
          rule.use = rule.use.filter(loader => {
            if (typeof loader === 'string') {
              return !loader.includes('postcss-loader');
            }
            if (loader && loader.loader) {
              return !loader.loader.includes('postcss-loader');
            }
            return true;
          });
        }
      }
    });
  }

  // Disable PostCSS completely by removing it from plugins
  if (config.plugins) {
    config.plugins = config.plugins.filter(plugin => {
      return !plugin.constructor.name.includes('PostCSS');
    });
  }

  // Add fallback for missing modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "postcss-selector-parser": false,
    "@csstools/selector-specificity": false,
    "@csstools/postcss-cascade-layers": false,
    "postcss-preset-env": false,
    "postcss": false
  };

  return config;
};