import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { EditableLesson } from './EditableLesson'
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom'

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
