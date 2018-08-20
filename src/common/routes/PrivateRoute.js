import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends PureComponent {
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
