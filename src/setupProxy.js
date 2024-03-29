const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL_SOCKET, // Адрес вашего API
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '', // Убираем префикс /api из URL
      },
    })
  );
};