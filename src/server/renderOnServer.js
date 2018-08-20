import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import Helmet from 'react-helmet'

import RootPage from 'modules/root/pages/RootPage'
import I18nProvider from 'common/i18n'
import { combinedRoutes } from 'common/routes'
import configureStore from 'common/store/configureStore'

import renderHtml from './renderHtml'
import fetchData from './fetchData'

const renderOnServer = (req, res) => {
  const store = configureStore()
  const fetchDataPromises = fetchData(store, req)

  Promise.all(fetchDataPromises)
    .then(() => {
      const sheet = new ServerStyleSheet()
      const initailState = store.getState()

      const content = {
        body: renderToString(
          sheet.collectStyles(
            <Provider store={store}>
              <Router location={req.url} context={{}}>
                <I18nProvider>
                  <RootPage />
                </I18nProvider>
              </Router>
            </Provider>
          )
        ),
        css: {
          bundle: res.locals.assetPath('bundle.css'),
          vendor: res.locals.assetPath('vendor.css'),
        },
        scripts: {
          bundle: res.locals.assetPath('bundle.js'),
          vendor: res.locals.assetPath('vendor.js'),
        },
        head: Helmet.renderStatic(),
        store: JSON.stringify(initailState).replace(/</g, '\\u003c'),
        styleTags: sheet.getStyleTags(),
      }

      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(renderHtml(content))
    })
    .catch(error => res.send(error))
}

export default renderOnServer
