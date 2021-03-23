import React from 'react'
import { ViewButton } from 'shared/ViewButton'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-left: 5px;
  position: fixed;
  top: 5px;
`

export const ViewMenuButton = ({ menuId }) => {
  const history = useHistory()
  const navigateToMenu = () => {
    history.push(`/viewMenu/${menuId}`)
  }
  return (
    <Wrapper>
      <ViewButton onClick={navigateToMenu} />
    </Wrapper>
  )
}

ViewMenuButton.propTypes = {
  menuId: PropTypes.string,
}
