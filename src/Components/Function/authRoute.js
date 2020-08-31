import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkAuth } from "../../actions/auth";


export const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect to='/login' />
        )
    )} />
  )
}