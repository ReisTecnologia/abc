import React, { useState } from 'react'
import { Drawer } from '@material-ui/core'
import { MenuButton } from 'shared/MenuButton'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from 'shared/colors'

const ListItemWrapper = styled.li`
  background-color: white;
  :hover {
    background-color: ${colors.primary};
    cursor: pointer;
    color: white;
  }
  list-style-type: none;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
`
const ListWrapper = styled.ul`
  margin: 0;
  width: 20vw;
  min-width: 150px;
  max-width: 300px;
`

export const MenuDrawer = () => {
  const [drawer, setDrawer] = useState(false)

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  let history = useHistory()
  const navigateToMenus = () => {
    history.push('/menus')
    setDrawer(!drawer)
  }
  const navigateToLessons = () => {
    history.push('/lessons')
    setDrawer(!drawer)
  }
  const navigateToUsers = () => {
    history.push('/users')
    setDrawer(!drawer)
  }

  return (
    <div>
      <Drawer open={drawer} onClose={toggleDrawer}>
        <ListWrapper>
          <ListItemWrapper onClick={navigateToMenus}>Menus</ListItemWrapper>
          <ListItemWrapper onClick={navigateToLessons}>Aulas</ListItemWrapper>
          <ListItemWrapper onClick={navigateToUsers}>Usuários</ListItemWrapper>
        </ListWrapper>
      </Drawer>
      <MenuButton onClick={toggleDrawer} />
    </div>
  )
}
