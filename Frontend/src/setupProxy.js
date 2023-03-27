const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    ["/notices"],
    createProxyMiddleware({
      target: 'http://j8a206.p.ssafy.io:8995',
      changeOrigin: true,
    })
  );
}  
