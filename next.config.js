/* eslint-disable no-param-reassign */
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack(config) {
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: 'jsconfig.json',
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      })
    )
    return config
  },
  experimental: { documentMiddleware: true }
}
