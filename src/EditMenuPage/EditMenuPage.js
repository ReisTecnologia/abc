import React from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { EditableMenuLoader } from './EditableMenuLoader'

export const EditMenuPage = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:menu`}>
        <EditableMenuLoader />
      </Route>
    </Switch>
  )
}

EditMenuPage.propTypes = {
  id: PropTypes.string.isRequired,
}
