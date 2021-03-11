import React from 'react'
import { ViewMenuLoader } from './ViewMenuLoader'

import { useRouteMatch, Switch, Route } from 'react-router-dom'

export const ViewMenuPage = () => {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/:menu`}>
        <ViewMenuLoader />
      </Route>
    </Switch>
  )
}
