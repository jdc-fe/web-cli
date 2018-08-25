module.exports = {
  // 修改为相对路径
  baseUrl: process.env.BASE_URL,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
