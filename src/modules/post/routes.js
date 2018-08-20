import PostsPage from 'modules/post/pages/PostsPage'
import PostPage from 'modules/post/pages/PostPage'

export default [
  {
    path: '/posts/:id',
    component: PostPage,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
]
