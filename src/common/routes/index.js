import React from 'react'
import { Switch, Route } from 'react-router-dom'

import postRoutes from 'modules/post/routes'

import PrivateRoute from './PrivateRoute'

const renderAppRoutes = () => {
  const combinedRoutes = [...postRoutes]

  return combinedRoutes.map(({ path, component }) => (
    <PrivateRoute key={path} path={path} component={component} />
  ))
}

const renderNotFoundRoutes = () => (
  <Route
    render={() => {
      return <h1>Nomatch</h1>
    }}
  />
)

const HomePage = () => <h1>Home</h1>
const LoginPage = () => <h1>Login</h1>

const renderHomeRoutes = () => (
  <PrivateRoute exact path="/" component={HomePage} />
)

const Router = () => (
  <Switch>
    {renderHomeRoutes()}
    {renderAppRoutes()}
    <Route path="/login" component={LoginPage} />
    {renderNotFoundRoutes()}
  </Switch>
)

export default Router
