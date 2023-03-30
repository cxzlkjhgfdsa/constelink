const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ["/files/saveimg"],
    createProxyMiddleware({
      target: 'http://j8a206.p.ssafy.io:8996',
      changeOrigin: true,
    })
  );
  
  app.use(
    ["/auth, /members"],
    createProxyMiddleware({
      target: 'http://j8a206.p.ssafy.io:8997',
      changeOrigin: true,
    })
  );

  app.use(
    ["/fundraisings","/bookmarks"],
    createProxyMiddleware({
      target: 'http://j8a206.p.ssafy.io:8998',
      changeOrigin: true,
    })
  );

  app.use(
    ["/beneficiaries"],
    createProxyMiddleware({
      target: "http://j8a206.p.ssafy.io:8999",
      changeOrigin: true,
    })
  );

  app.use(
    ["/notices"],
    createProxyMiddleware({
      target: "http://j8a206.p.ssafy.io:8995",
      changeOrigin: true,
    })
  );
}
