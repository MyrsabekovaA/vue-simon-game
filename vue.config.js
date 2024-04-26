const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          VUE_APP_DEBUG_MODE: JSON.stringify(true)
        }
      })
    ]
  },
  publicPath: process.env.NODE_ENV === 'production'
      ? '/vue-simon-game/'
      : '/'
});