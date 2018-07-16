import React from 'react'
// import createHistory from 'history/createBrowserHistory'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
// import { ConnectedRouter as Router, routerMiddleware } from 'react-router-redux'

import RootPage from '../modules/root/pages/RootPage'
import { configureStore } from '../common/store'

// eslint-disable-next-line no-undef
// const browserHistory = window.browserHistory || createHistory()
const store =
  window.store ||
  configureStore({
    initialState: window.__PRELOADED_STATE__,
    // middleware: [routerMiddleware(browserHistory)],
  })

hydrate(
  <Provider store={store}>
    <Router>
      <RootPage />
    </Router>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('app')
)

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept()
  }

  // if (!window.store || !window.browserHistory) {
  //   window.browserHistory = browserHistory
  //   window.store = store
  // }

  if (!window.store) {
    window.store = store
  }
}
