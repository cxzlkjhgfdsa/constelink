const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    ["/beneficiaries","/bookmarks"],
    createProxyMiddleware({
      target: 'http://j8a206.p.ssafy.io:8999',
      changeOrigin: true,
    })
  );
}  