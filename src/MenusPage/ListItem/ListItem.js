import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { ListItemButton } from './ListItemButton'
import { Wrapper, MenuName, MenuButtons } from './ListItem.styles'

const navigateToViewMenu = (history, menuId) => (e) => {
  e.stopPropagation()
  history.push(`/viewMenu/${menuId}`)
}

const navigateToEditMenu = (history, menuId) => (e) => {
  e.stopPropagation()
  history.push(`/editMenu/${menuId}`)
}

export const ListItem = ({ menu }) => {
  const history = useHistory()

  return (
    <Wrapper onClick={navigateToEditMenu(history, menu.id)}>
      <MenuName>{menu.name}</MenuName>
      &nbsp;&nbsp;
      <MenuButtons>
        <ListItemButton onClick={navigateToViewMenu(history, menu.id)} />
      </MenuButtons>
      <br />
    </Wrapper>
  )
}

ListItem.propTypes = {
  menu: PropTypes.object,
}
