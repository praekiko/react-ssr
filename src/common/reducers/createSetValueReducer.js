import { handleActions } from 'redux-actions'

import setValueReducer from './setValueReducer'

export default (name, defaultState, extensions) => {
  const reducer = {
    [`SET_${name}`]: setValueReducer,
    [`SET_${name}_DEFAULT`]: () => defaultState,
    [`CLEAR_${name}`]: () => defaultState,
  }

  const extendedReducer = Object.assign({}, reducer, extensions)

  return handleActions(extendedReducer, defaultState)
}
