import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { ListItemButton } from './ListItemButton'
import { Wrapper, UserName, UserButtons } from './ListItem.styles'

// const navigateToViewMenu = (history, menuId) => (e) => {
//   e.stopPropagation()
//   history.push(`/viewMenu/${menuId}`)
// }

const navigateToEditUser = (history, userId) => (e) => {
  e.stopPropagation()
  history.push(`/editUser/${userId}`)
}

export const ListItem = ({ user }) => {
  const history = useHistory()

  return (
    <Wrapper onClick={navigateToEditUser(history, user.id)}>
      <UserName>{user.name}</UserName>
      &nbsp;&nbsp;
      <UserButtons>
        <ListItemButton />
      </UserButtons>
      <br />
    </Wrapper>
  )
}

ListItem.propTypes = {
  user: PropTypes.string,
}
