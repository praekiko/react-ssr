import { isEqual } from 'lodash'
import { createAction } from 'redux-actions'

import BaseApi from 'common/lib/BaseApi'

function shouldFetch(prevKey, newKey) {
  return (!prevKey && !newKey) || !isEqual(prevKey, newKey)
}

export default name => {
  const actions = {
    set: createAction(`SET_${name}`),
    setKey: createAction(`SET_${name}_KEY`),
    setFetching: createAction('SET_FETCHING', (name, value) => ({
      name,
      value,
    })),
    clear: () => dispatch => {
      dispatch(createAction(`SET_${name}`)({}))
      dispatch(createAction(`SET_${name}_KEY`)(false))
    },
    fetch: (methodName, stateKey, { ignoreKey = false } = {}) => {
      return (...params) => (dispatch, getState, context) => {
        const stateInStore = getState()[stateKey]
        const prevKey = stateInStore ? stateInStore.key : null
        const newKey = params ? { params } : {}

        if (!shouldFetch(prevKey, newKey) && !ignoreKey) {
          return Promise.resolve(stateInStore.value)
        }

        dispatch(actions.setFetching(name, true))

        return BaseApi[methodName](...params)
          .then(data => {
            dispatch(actions.setKey(newKey))
            dispatch(actions.set(data))
            dispatch(actions.setFetching(name, false))

            return data
          })
          .catch(error => {
            dispatch(actions.setFetching(name, false))

            return Promise.reject(error)
          })
      }
    },
  }

  return actions
}
