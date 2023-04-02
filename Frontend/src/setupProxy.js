const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ["/file/saveimg","/auth", "/member", "/donations","/fundraising","/bookmarks","/beneficiary" ],
    createProxyMiddleware({
      target: 'http://j8a206.p.ssafy.io',
      changeOrigin: true,
    })
  )

  // app.use(
  //   ["/files/saveimg"],
  //   createProxyMiddleware({
  //     target: 'http://j8a206.p.ssafy.io:8996',
  //     changeOrigin: true,
  //   })
  // )
  
  // app.use(
  //   ["/auth", "/members", "/donations"],
  //   createProxyMiddleware({
  //     target: 'http://j8a206.p.ssafy.io:8997',
  //     changeOrigin: true,
  //   })
  // )

  // app.use(
  //   ["/fundraisings","/bookmarks"],
  //   createProxyMiddleware({
  //     target: 'http://j8a206.p.ssafy.io:8998',
  //     changeOrigin: true,
  //   })
  // )

  // app.use(
  //   ["/beneficiaries"],
  //   createProxyMiddleware({
  //     target: "http://j8a206.p.ssafy.io:8999",
  //     changeOrigin: true,
  //   })
  // )

  app.use(
    ["/notice"],
    createProxyMiddleware({
      target: "http://j8a206.p.ssafy.io:8995",
      changeOrigin: true,
    })
  )
}
