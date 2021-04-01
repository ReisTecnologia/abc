import React from 'react'
// import { CurrentUserContext } from 'shared/CurrentUserContextProvider'
// import { Title, PageActions, UserButtonWrapper } from './LessonsPage.styles.js'
// import { HeaderWrapper } from 'shared/HeaderWrapper'
// import { MenuDrawer } from 'shared/MenuDrawer'
// import { UserDrawer } from 'shared/UserDrawer/UserDrawer'
// import { Spinner } from 'shared/Spinner'

// import { useHistory } from 'react-router'

import { AddLessonButton } from './AddLessonButton/AddLessonButton'
import { ListItem } from './ListItem/ListItem'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { Header } from 'shared/Header/Header'

import PropTypes from 'prop-types'
import { AccessGateway } from 'shared/AccessGateway'

export const LessonsPage = ({ lessons, refetch }) => {
  return (
    <AccessGateway role="admin">
      <Layout>
        <Header
          title="Aulas"
          pageActions={<AddLessonButton afterAdd={refetch} />}
        />
        <Container>
          {lessons.map((lesson) => (
            <ListItem key={lesson.id} lesson={lesson} />
          ))}
        </Container>
      </Layout>
    </AccessGateway>
  )
}

LessonsPage.propTypes = {
  lessons: PropTypes.object,
  refetch: PropTypes.func,
}
