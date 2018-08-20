// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PostActions from '../../actions'
import PostSelectors from '../../selectors'

type Post = {
  id: number,
  title: string,
}

type ReduxProps = {
  posts: Array<Post>,
  isFetching: boolean,
  fetchPosts: () => Array<Post>,
}

type Props = ReduxProps & {}

class PostsPage extends PureComponent<Props> {
  componentDidMount() {
    const { fetchPosts } = this.props
    fetchPosts()
  }

  render() {
    const { posts, isFetching } = this.props

    return (
      <div>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          posts.map(post => (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <p>{post.title}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: PostSelectors.getPosts(state),
  isFetching: PostSelectors.getPostsIsFetching(state),
})

const mapDispatchToProps = {
  fetchPosts: PostActions.fetchPosts,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsPage)
