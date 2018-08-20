import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

const createFetchingReducer = name => {
  const reducer = (state, action) => {
    if (action.payload.name === name) {
      return action.payload.value
    }
    return state
  }

  return handleActions(
    {
      SET_FETCHING: reducer,
    },
    false
  )
}

const setValueReducer = (state, action) => {
  if (action.error) {
    return state
  }

  return action.payload || null
}

const createSetValueReducer = (name, defaultValue) => {
  return handleActions(
    {
      [`SET_${name}`]: setValueReducer,
    },
    defaultValue
  )
}

const createErrorReducer = name => {
  const reducer = (state, action) => {
    if (action.error && action.payload) {
      return action.payload
    }
    return null
  }

  return handleActions(
    {
      [`SET_${name}`]: reducer,
    },
    null
  )
}

export default (name, defaultValue) =>
  combineReducers({
    isFetching: createFetchingReducer(name),
    value: createSetValueReducer(name, defaultValue),
    key: createSetValueReducer(`${name}_KEY`, null),
    error: createErrorReducer(name),
  })
