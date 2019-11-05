/* eslint-disable no-param-reassign */
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack(config, { isServer }) {
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: 'jsconfig.json',
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      })
    )
    config.resolve.alias['env-config$'] = isServer
      ? path.resolve('config/server.js')
      : path.resolve('config/client.js')
    return config
  },
  experimental: { documentMiddleware: true }
}
