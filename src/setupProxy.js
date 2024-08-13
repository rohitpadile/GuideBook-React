// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/crypto', {
      target: 'http://localhost:3000',
      pathRewrite: { '^/crypto': '' },
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};
