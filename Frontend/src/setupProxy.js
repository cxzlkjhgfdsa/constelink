const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    ["/beneficiaries", "/recoverydiaries", "/bookmarks"],
    createProxyMiddleware({
      target: 'http://j8a206.p.ssafy.io:8999',
      changeOrigin: true,
    })
  );

  app.use(
    ["/files/saveimg"],
    createProxyMiddleware({
      target: 'http://j8a206.p.ssafy.io:8996',
      changeOrigin: true,
    })
  );
}
