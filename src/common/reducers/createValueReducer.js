import { handleActions } from 'redux-actions'

const setValueReducer = (state, action) => {
  const { error, payload } = action

  if (error) {
    return state
  }

  return payload || null
}

export default (name, defaultState, extensions) => {
  const reducer = {
    [`SET_${name}`]: setValueReducer,
    [`SET_${name}_DEFAULT`]: () => defaultState,
    [`CLEAR_${name}`]: () => defaultState,
  }

  const extendedReducer = Object.assign({}, reducer, extensions)

  return handleActions(extendedReducer, defaultState)
}
