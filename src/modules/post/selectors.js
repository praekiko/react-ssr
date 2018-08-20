export default {
  getPosts: state => state.posts.value,
  getPostsIsFetching: state => state.posts.isFetching,
  getPost: state => state.post.value,
  getPostIsFetching: state => state.post.isFetching,
}
