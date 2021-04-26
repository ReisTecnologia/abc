import React, { useState } from 'react'
import { Drawer } from '@material-ui/core'
import styled from 'styled-components'
import { colors } from '_shared/colors'
import PropTypes from 'prop-types'
import { LogoutButton } from '_shared/LogoutButton'
import { UserButton } from './UserButton'

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

export const UserDrawer = ({ initial }) => {
  const [drawer, setDrawer] = useState(false)

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  return (
    <div>
      <Drawer open={drawer} onClose={toggleDrawer} anchor="right">
        <ListWrapper>
          <ListItemWrapper>
            <LogoutButton />
          </ListItemWrapper>
        </ListWrapper>
      </Drawer>
      <UserButton onClick={toggleDrawer} initial={initial} />
    </div>
  )
}

UserDrawer.propTypes = {
  initial: PropTypes.string,
}
