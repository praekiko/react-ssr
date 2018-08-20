import PostsPage from 'modules/post/pages/PostsPage'
import PostPage from 'modules/post/pages/PostPage'

export default [
  {
    path: '/posts/:id',
    component: PostPage,
    exact: true,
  },
  {
    path: '/posts',
    component: PostsPage,
    exact: true,
  },
]
