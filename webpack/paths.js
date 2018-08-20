const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const paths = {
  clientBuild: resolveApp('dist/client'),
  serverBuild: resolveApp('dist/server'),
  src: resolveApp('src'),
  srcClient: resolveApp('src/client'),
  srcServer: resolveApp('src/server'),
  publicPath: '/static/',
  common: resolveApp('src/common'),
  modules: resolveApp('src/modules'),
}

paths.resolveModules = [
  paths.common,
  paths.modules,
  paths.srcClient,
  paths.srcServer,
  paths.src,
  'node_modules',
]

module.exports = paths
