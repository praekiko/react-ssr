import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'

import RootPage from 'modules/root/pages/RootPage'
import I18nProvider from 'common/i18n'
import configureStore from 'common/store/configureStore'

const store =
  window.store ||
  configureStore({
    initialState: window._store_,
  })

hydrate(
  <Provider store={store}>
    <Router>
      <I18nProvider>
        <RootPage />
      </I18nProvider>
    </Router>
  </Provider>,
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
