import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import RootPage from '../modules/root/pages/RootPage'
import Html from './renderToHtml'

const serverRenderer = () => (req, res) => {
  const content = renderToString(
    <Provider store={req.store}>
      <Router location={req.url} context={{}}>
        <RootPage />
      </Router>
    </Provider>
  )

  const state = JSON.stringify(req.store.getState())
  const htmlString = renderToString(
    <Html
      css={[
        res.locals.assetPath('bundle.css'),
        res.locals.assetPath('vendor.css'),
      ]}
      scripts={[
        res.locals.assetPath('bundle.js'),
        res.locals.assetPath('vendor.js'),
      ]}
      state={state}
    >
      {content}
    </Html>
  )

  return res.send(`<!doctype html> ${htmlString}`)
}

export default serverRenderer
