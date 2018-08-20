// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { translate } from 'react-i18next'

import PostActions from 'modules/post/actions'
import PostSelectors from 'modules/post/selectors'

import createMeta from './createMeta'

type ReduxProps = {
  post: { id: number, title: string },
  isFetching: boolean,
  fetchPost: number => {},
}

type Props = ReduxProps & {
  match: { params: { id: number } },
  t: Function,
}

class PostPage extends PureComponent<Props> {
  static fetchData = (store, props) => {
    const {
      match: {
        params: { id },
      },
    } = props

    return Promise.all([store.dispatch(PostActions.fetchPost(id))])
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      post,
      fetchPost,
    } = this.props

    if (isEmpty(post)) {
      fetchPost(id)
    }
  }

  render() {
    const { post, isFetching, t } = this.props

    const meta = createMeta(post.title, t)

    return (
      <div>
        {meta.toComponent()}

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
)(translate()(PostPage))
