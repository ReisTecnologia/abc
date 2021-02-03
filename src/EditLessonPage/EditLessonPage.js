import React from 'react'
import { EditableLessonLoader } from './EditableLessonLoader'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

export const EditLessonPage = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:lesson`}>
        <EditableLessonLoader />
      </Route>
    </Switch>
  )
}
