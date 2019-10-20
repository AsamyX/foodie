module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://foodie.aqarmap.net',
        pathRewrite: { '^/api/': '/api/' },
        changeOrigin: true
      },
    }
  }
}