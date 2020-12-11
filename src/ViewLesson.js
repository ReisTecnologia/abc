import React from 'react'
import PropTypes from 'prop-types'
import { Lesson } from './Lesson'

import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom'

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
