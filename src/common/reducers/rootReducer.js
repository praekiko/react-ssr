import { combineReducers } from 'redux'

// import root from '../../modules/root/reducer'
import common from './index'

const rootReducer = combineReducers({
  ...common,
})

export default rootReducer
