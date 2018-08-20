import thunkMiddleware from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from 'common/reducers/rootReducer'

const isProduction = process.env.NODE_ENV === 'production'
const reduxImmutableStateInvariantMiddleware = reduxImmutableStateInvariant()

const middleware = isProduction
  ? [thunkMiddleware]
  : [thunkMiddleware, reduxImmutableStateInvariantMiddleware]

function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  )
}

export default configureStore
