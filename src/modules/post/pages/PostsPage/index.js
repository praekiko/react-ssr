// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { translate } from 'react-i18next'

import PostActions from 'modules/post/actions'
import PostSelectors from 'modules/post/selectors'

import createMeta from './createMeta'

type Post = {
  id: number,
  title: string,
}

type ReduxProps = {
  posts: Array<Post>,
  isFetching: boolean,
  fetchPosts: () => Array<Post>,
}

type Props = ReduxProps & {
  t: Function,
}

class PostsPage extends PureComponent<Props> {
  static fetchData = (store, props) => {
    return Promise.all([store.dispatch(PostActions.fetchPosts())])
  }

  componentDidMount() {
    const { posts, fetchPosts } = this.props

    if (isEmpty(posts)) {
      fetchPosts()
    }
  }

  render() {
    const { posts, isFetching, t } = this.props

    const meta = createMeta(t)

    return (
      <div>
        {meta.toComponent()}

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
)(translate()(PostsPage))
