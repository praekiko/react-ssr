import PostsPage from './pages/PostsPage'
import PostPage from './pages/PostPage'

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
