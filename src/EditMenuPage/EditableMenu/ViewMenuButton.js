import React from 'react'
import { ViewButton } from 'shared/ViewButton'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

export const ViewMenuButton = ({ menuId }) => {
  const history = useHistory()
  const navigateToMenu = () => {
    history.push(`/viewMenu/${menuId}`)
  }
  return <ViewButton onClick={navigateToMenu} />
}

ViewMenuButton.propTypes = {
  menuId: PropTypes.string,
}
