// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import PostActions from '../../actions'
import PostSelectors from '../../selectors'

type ReduxProps = {
  post: { id: number, title: string },
  isFetching: boolean,
  fetchPost: number => {},
}

type Props = ReduxProps & {
  match: { params: { id: number } },
}

class PostPage extends PureComponent<Props> {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      fetchPost,
    } = this.props

    fetchPost(id)
  }

  render() {
    const { post, isFetching } = this.props

    return (
      <div>
        {isFetching ? <p>Loading...</p> : <h1 key={post.id}>{post.title}</h1>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: PostSelectors.getPost(state),
  isFetching: PostSelectors.getPostIsFetching(state),
})

const mapDispatchToProps = {
  fetchPost: PostActions.fetchPost,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage)
