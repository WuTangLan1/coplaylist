// vue.config.js

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify' // Ensures Vuetify components are properly transpiled
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
})
