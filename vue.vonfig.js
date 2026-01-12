const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 1010,
    proxy: {
      '/api': {
        target: 'https://api.tipoffer.apel.com.ng',
        changeOrigin: true
      }
    }
  }
})