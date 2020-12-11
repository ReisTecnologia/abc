import React from 'react'
import { Lesson } from './Lesson'

<<<<<<< HEAD
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom'
=======
import {
  useRouteMatch,
  Switch,
  Route
} from 'react-router-dom'
>>>>>>> 5c228a2270178db96307b764462ce1c722001ec5

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
