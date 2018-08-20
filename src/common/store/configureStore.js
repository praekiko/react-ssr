import thunkMiddleware from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from 'common/reducers/rootReducer'

const devMode = process.env.NODE_ENV === 'development'
const reduxImmutableStateInvariantMiddleware = reduxImmutableStateInvariant()

const middleware = !devMode
  ? [thunkMiddleware]
  : [thunkMiddleware, reduxImmutableStateInvariantMiddleware]

function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
}

export default configureStore
