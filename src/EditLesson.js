import React from 'react'
import { EditableLesson } from './EditableLesson'
import { useRouteMatch, Switch, Route } from 'react-router-dom'


export const EditLesson = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:lesson`}>
        <EditableLesson />
      </Route>
    </Switch>
  )
}
