const path = require('path');

module.exports = function override(config, env) {
  // Disable treating ESLint warnings as errors in production builds
  if (env === 'production') {
    // Find ESLint plugin and configure it to not fail on warnings
    const eslintPlugin = config.plugins.find(plugin => 
      plugin.constructor.name === 'ESLintWebpackPlugin'
    );
    
    if (eslintPlugin) {
      eslintPlugin.options = {
        ...eslintPlugin.options,
        failOnWarning: false,
        failOnError: false,
        emitWarning: true
      };
    }
    
    // Alternative: Remove ESLint plugin completely if there are dependency issues
    // This is a fallback for environments where ESLint dependencies are problematic
    if (process.env.DISABLE_ESLINT === 'true') {
      config.plugins = config.plugins.filter(plugin => 
        plugin.constructor.name !== 'ESLintWebpackPlugin'
      );
    }
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