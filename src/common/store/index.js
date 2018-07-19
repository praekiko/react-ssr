import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from '../reducers/rootReducer'

export const configureStore = ({ initialState, middleware = [] } = {}) => {
  const devMode = process.env.NODE_ENV === 'development'

  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] })

  const composeEnhancers = devMode ? devtools || compose : compose

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
  )

  if (devMode) {
    if (module.hot) {
      module.hot.accept('../reducers/rootReducer', () =>
        store.replaceReducer(require('../reducers/rootReducer').default)
      )
    }
  }

  return store
}

export default configureStore
