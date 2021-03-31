import React, { useState } from 'react'
import { Drawer } from '@material-ui/core'
import { CollapsedButtons } from './CollapsedButtons'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { DeleteButton } from './DeleteButton'
import { CleanupFilesButton } from './CleanupFilesButton'
import { ReloadButton } from './ReloadButton'
import { ViewLessonButton } from './ViewLessonButton'
import { LogoutButton } from 'shared/LogoutButton'
import PropTypes from 'prop-types'

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
const LogoutButtonWrapper = styled.div`
  @media (min-width: 600px) {
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 20vw;
    min-width: 150px;
    max-width: 300px;
    :hover {
      background-color: ${colors.primary};
      cursor: pointer;
      color: white;
    }
  }
  @media (max-width: 599px) {
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 20vw;
    min-width: 150px;
    max-width: 300px;
    :hover {
      background-color: ${colors.primary};
      cursor: pointer;
      color: white;
    }
  }
`

export const CollapsedButtonsDrawer = ({
  id,
  afterDelete,
  reload,
  loading,
}) => {
  const [drawer, setDrawer] = useState(false)

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  return (
    <div>
      <Drawer open={drawer} onClose={toggleDrawer} anchor="right">
        <ListWrapper>
          <ListItemWrapper>
            <ViewLessonButton lessonId={id} />
          </ListItemWrapper>
          <ListItemWrapper>
            <CleanupFilesButton id={id} />
          </ListItemWrapper>
          <ListItemWrapper>
            <DeleteButton id={id} afterDelete={afterDelete} />
          </ListItemWrapper>
          <ListItemWrapper>
            <ReloadButton reload={reload} loading={loading} />
          </ListItemWrapper>
        </ListWrapper>
        <LogoutButtonWrapper>
          <LogoutButton />
        </LogoutButtonWrapper>
      </Drawer>
      <CollapsedButtons onClick={toggleDrawer} />
    </div>
  )
}

CollapsedButtonsDrawer.propTypes = {
  id: PropTypes.string,
  afterDelete: PropTypes.func,
  reload: PropTypes.func,
  loading: PropTypes.bool,
}
