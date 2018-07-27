module.exports = {
  devServer: {
    // quiet: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  chainWebpack: config => {
    config.plugin('fork-ts-checker').tap(([options]) => {
      return [{
        async: false,
        tslint: true,
        vue: true
      }]
    })
  },
  configureWebpack: {
    plugins: []
  }
}