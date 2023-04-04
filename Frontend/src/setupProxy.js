const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // app.use(
  //   ["/files/saveimg"],
  //   createProxyMiddleware({
  //     target: 'http://j8a206.p.ssafy.io:8996',
  //     changeOrigin: true,
  //   })
  // )
  
<<<<<<< HEAD
  // app.use(
  //   ["/auth", "/members", "/donations"],
  //   createProxyMiddleware({
  //     target: 'http://j8a206.p.ssafy.io:8997',
  //     changeOrigin: true,
  //   })
  // )

  // app.use(
  //   ["/fundraisings","/bookmarks", "/categories"],
  //   createProxyMiddleware({
  //     target: 'http://j8a206.p.ssafy.io:8998',
  //     changeOrigin: true,
  //   })
  // )

  // app.use(
  //   ["/beneficiaries", "/recoverydiaries" ,"hospitals"],
  //   createProxyMiddleware({
  //     target: "http://j8a206.p.ssafy.io:8999",
  //     changeOrigin: true,
  //   })
  // )
=======
  app.use(
    ["/auth", "/member", "/donations"],
    createProxyMiddleware({
      target: 'http://j8a206.p.ssafy.io/',
      changeOrigin: true,
    })
  )
>>>>>>> f456c525745490b9f13d535fa0193e6b7a97dcbc

  app.use(
    ["/notices" ,"/files/saveimg", "/beneficiary",
    "/fundraising", "/member", 
     ],
    createProxyMiddleware({
      target: "http://j8a206.p.ssafy.io",
      changeOrigin: true,
    })
  )
}
