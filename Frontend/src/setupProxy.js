const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     ["/fundraisings","/bookmarks"],
//     createProxyMiddleware({
//       target: 'http://j8a206.p.ssafy.io:8998',
//       changeOrigin: true,
//     })
//   );
// }  

module.exports = function(app) {
    app.use(
      ["/auth"],
      createProxyMiddleware({
        target: 'http://j8a206.p.ssafy.io:8997',
        changeOrigin: true,
      })
    );
  }  
