const webpack = require('webpack')
const rimraf = require('rimraf')

const env = process.env.NODE_ENV || 'production'

const webpackConfig = require('../webpack')(env)
const paths = require('../webpack/paths')
const { logMessage, compilerPromise } = require('./utils')

const build = async () => {
  rimraf.sync(paths.clientBuild)
  rimraf.sync(paths.serverBuild)

  const [clientConfig, serverConfig] = webpackConfig
  const multiCompiler = webpack([clientConfig, serverConfig])

  const clientCompiler = multiCompiler.compilers[0]
  const serverCompiler = multiCompiler.compilers[1]

  const clientPromise = compilerPromise(clientCompiler)
  const serverPromise = compilerPromise(serverCompiler)

  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats))
    }
  })

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats))
    }
  })

  // wait until client and server is compiled
  try {
    await serverPromise
    await clientPromise
    logMessage('Done!', 'info')
    process.exit()
  } catch (error) {
    logMessage(error, 'error')
    process.exit(1)
  }
}

build()
