import React from 'react'
import { EditableLesson } from './shared/EditableLesson'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

export const EditLessonPage = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:lesson`}>
        <EditableLesson />
      </Route>
    </Switch>
  )
}
