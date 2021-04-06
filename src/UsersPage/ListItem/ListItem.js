import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { ListItemButton } from './ListItemButton'
import { Wrapper, UserName, UserButtons } from './ListItem.styles'

const navigateToViewUser = (history, userId) => (e) => {
  e.stopPropagation()
  history.push(`/viewUser/${userId}`)
}

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
        <ListItemButton onClick={navigateToViewUser(history, user.id)} />
      </UserButtons>
      <br />
    </Wrapper>
  )
}

ListItem.propTypes = {
  user: PropTypes.object,
}
