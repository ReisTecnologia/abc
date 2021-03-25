import React from 'react'
import { ViewUserLoader } from './ViewUserLoader'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

export const ViewUserPage = () => {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/:user`}>
        <ViewUserLoader />
      </Route>
    </Switch>
  )
}
