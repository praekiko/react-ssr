const webpack = require('webpack')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')

const baseConfig = require('./base')

const config = {
  ...baseConfig,
  plugins: [
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...baseConfig.plugins,
  ],
  mode: 'development',
  performance: {
    hints: false,
  },
}

module.exports = config
