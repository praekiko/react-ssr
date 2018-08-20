import createAsyncValueAction from 'common/actions/createAsyncValueAction'

import constanst from './constants'

const posts = createAsyncValueAction(constanst.POSTS)
const post = createAsyncValueAction(constanst.POST)

export default {
  fetchPosts: () => posts.fetch('getPosts', 'posts')(),
  fetchPost: id => post.fetch('getPost', 'post')(id),
}
