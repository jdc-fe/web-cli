const { env: { BASE_URL }, VUE_CLI_SERVICE: { mode } } = process

module.exports = {
  // 修改为相对路径
  baseUrl: BASE_URL,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8080
  },
  productionSourceMap: mode !== 'production',
}
