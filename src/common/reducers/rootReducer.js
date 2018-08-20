import { combineReducers } from 'redux'

import commonReducers from './index'
import post from '../../modules/post/reducers'

export const rootReducer = combineReducers({ ...commonReducers, ...post })
