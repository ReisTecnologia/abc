import React from 'react'
import { Lesson } from './Lesson'

import { useLocation, useRouteMatch, Switch, Route } from 'react-router-dom'

export const ViewLessonPage = () => {
  let { path } = useRouteMatch()
  const search = useLocation().search
  const menuId = new URLSearchParams(search).get('menuId')

  return (
    <Switch>
      <Route path={`${path}/:lesson`}>
        <Lesson menuId={menuId} />
      </Route>
    </Switch>
  )
}
