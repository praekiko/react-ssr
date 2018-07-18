import express from 'express'
import cors from 'cors'
import path from 'path'
import chalk from 'chalk'
import manifestHelpers from 'express-manifest-helpers'
import bodyParser from 'body-parser'

import { configureStore } from '../common/store'
import renderOnServer from './renderOnServer'
import paths from '../../webpack/paths'

const devMode = process.env.NODE_ENV === 'development'

const app = express()

app.use(
  paths.publicPath,
  express.static(path.join(paths.clientBuild, paths.publicPath))
)
app.use('/favicon.ico', (req, res) => {
  res.send('')
})

app.use(cors())

app.use(bodyParser.json())

app.use((req, res, next) => {
  req.store = configureStore()
  return next()
})

const manifestPath = path.join(paths.clientBuild, paths.publicPath)

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`,
  })
)

app.use(renderOnServer())

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  return res.status(404).json({
    status: 'error',
    message: err.message,
    stack:
      // print a nicer stack trace by splitting line breaks and making them array items
      devMode &&
      (err.stack || '')
        .split('\n')
        .map(line => line.trim())
        .map(line => line.split(path.sep).join('/'))
        .map(line =>
          line.replace(
            process
              .cwd()
              .split(path.sep)
              .join('/'),
            '.'
          )
        ),
  })
})

app.listen(process.env.PORT || 8080, () => {
  console.log(
    chalk.blue(
      `App is running: 🍀 http://localhost:${process.env.PORT || 8080}`
    )
  )
})

export default app
