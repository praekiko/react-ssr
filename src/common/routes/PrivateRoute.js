// @flow

import React, { PureComponent, type Node } from 'react'
import { Route, Redirect } from 'react-router-dom'

type Props = { component: Node }

class PrivateRoute extends PureComponent<Props> {
  isUserLogin = () => {
    return true
  }

  render() {
    const { component: Component, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={props =>
          this.isUserLogin() ? (
            // $FlowFixMe
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: `/login`,
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )
  }
}

export default PrivateRoute
