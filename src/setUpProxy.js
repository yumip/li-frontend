const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/LNScrapingByName",
    createProxyMiddleware({
      target:
        "https://us-central1-almostawake.cloudfunctions.net/scrapeResults",
      changeOrigin: true,
    })
  );
};
