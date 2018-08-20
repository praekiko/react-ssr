import { combineReducers } from 'redux'

import post from 'modules/post/reducers'

import commonReducers from './index'

const rootReducer = combineReducers({ ...commonReducers, ...post })

export default rootReducer
