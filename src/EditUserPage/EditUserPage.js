import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { EditableUserLoader } from './EditableUserLoader'

export const EditUserPage = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:user`}>
        <EditableUserLoader />
      </Route>
    </Switch>
  )
}
