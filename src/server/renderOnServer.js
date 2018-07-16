import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import Helmet from 'react-helmet'

import RootPage from '../modules/root/pages/RootPage'
import I18nProvider from '../common/i18n'

import renderHtml from './renderHtml'

const renderOnServer = () => (req, res) => {
  const sheet = new ServerStyleSheet()

  const content = {
    body: renderToString(
      sheet.collectStyles(
        <Provider store={req.store}>
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
    store: JSON.stringify(req.store.getState()),
    styleTags: sheet.getStyleTags(),
  }

  return res.send(renderHtml(content))
}

export default renderOnServer
