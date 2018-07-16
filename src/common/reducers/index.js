import { combineReducers } from 'redux'
// import { routerReducer as router } from 'react-router-redux'

import root from '../../modules/root/reducer'

const rootReducer = combineReducers({
  root,
})

export default rootReducer
