const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 1010,
    proxy: {
      '/api': {
        target: 'http://localhost:1000',
        changeOrigin: true
      }
    }
  }
})