import React from 'react'
import { ViewMenuLoader } from './ViewMenuLoader'

import { useRouteMatch, Switch, Route } from 'react-router-dom'

export const ViewMenuPage = () => {
  let { path } = useRouteMatch()
  console.log('view menu page', path)
  return (
    <Switch>
      <Route path={`${path}/:menuId`}>
        <ViewMenuLoader />
      </Route>
    </Switch>
  )
}
