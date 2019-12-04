var path = require('path')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('stylus')
      .oneOf('vue')
      .use('resolve-url-loader')
      .loader('resolve-url-loader').options({
        keepQuery: true
      })
      .before('stylus-loader')

    config.module
      .rule('stylus')
      .oneOf('vue')
      .use('stylus-loader')
      .loader('stylus-loader')
      .tap(options => ({
        ...options,
        sourceMap: true,
        sourceMapContents: false
      }))
  },
  css: {
    loaderOptions: {
      css: {
        url: true,
        sourceMap: true
      },
      stylus: {
        import: [path.resolve(__dirname, 'src/themes/main')],
        url: true,
        sourceMap: true
      }
    }
  }
}
