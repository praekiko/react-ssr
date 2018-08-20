import createAsyncValueReducer from '../../common/reducers/createAsyncValueReducer'

import constanst from './constants'

export default {
  posts: createAsyncValueReducer(constanst.POSTS, []),
  post: createAsyncValueReducer(constanst.POST, {}),
}
