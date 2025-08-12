const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Remove PostCSS loader completely
      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
      
      if (oneOfRule) {
        oneOfRule.oneOf.forEach(rule => {
          if (rule.test && rule.test.toString().includes('css')) {
            // Remove postcss-loader from the use array
            if (rule.use && Array.isArray(rule.use)) {
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
      
      return webpackConfig;
    },
  },
  style: {
    postcss: {
      // Disable PostCSS completely
      plugins: [],
    },
  },
};