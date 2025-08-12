const path = require('path');

module.exports = function override(config, env) {
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