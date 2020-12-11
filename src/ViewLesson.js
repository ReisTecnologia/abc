import React from 'react'
import { Lesson } from './Lesson'

import {
  useRouteMatch,
  Switch,
  Route
} from 'react-router-dom'

export const ViewLesson = () => {
    let { path } = useRouteMatch()
    return (
      <Switch>
        <Route path={`${path}/:lesson`}>
          <Lesson />
        </Route>
      </Switch>
    )
}
