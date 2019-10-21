module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/main.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://foodie.aqarmap.net',
        pathRewrite: { '^/api/': '/api/' },
        changeOrigin: true
      },
    }
  },
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  }
}