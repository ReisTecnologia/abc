import React from 'react'
import { useLocation, useRouteMatch, Switch, Route } from 'react-router-dom'
import { ViewLessonLoader } from './ViewLessonLoader'

export const ViewLessonPage = () => {
  let { path } = useRouteMatch()
  const search = useLocation().search
  const menuId = new URLSearchParams(search).get('menuId')

  return (
    <Switch>
      <Route path={`${path}/:lessonId`}>
        <ViewLessonLoader menuId={menuId} />
      </Route>
    </Switch>
  )
}
