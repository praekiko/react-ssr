import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'

import RootPage from '../modules/root/pages/RootPage'
import { configureStore } from '../common/store'

const store =
  window.store ||
  configureStore({
    initialState: window._store_,
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

  if (!window.store) {
    window.store = store
  }
}
