
module.exports = {
  globDirectory: "dist/",
  globPatterns: [
    "**/*.{css,ico,html,js}"
  ],
  swDest: "dist/sw.js",
  runtimeCaching: [{
    urlPattern: /\.(?:png|jpg|jpeg|svg|json)$/,
    handler: 'StaleWhileRevalidate'
  }]
};