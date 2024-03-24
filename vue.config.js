const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/api/v1' },
      },
    },
  },
  transpileDependencies: true,
});
