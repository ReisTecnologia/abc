import React from 'react'
// import { CurrentUserContext } from 'shared/CurrentUserContextProvider'
// import { Title, PageActions, UserButtonWrapper } from './LessonsPage.styles.js'
// import { HeaderWrapper } from 'shared/HeaderWrapper'
// import { MenuDrawer } from 'shared/MenuDrawer'
// import { UserDrawer } from 'shared/UserDrawer/UserDrawer'
// import { Spinner } from 'shared/Spinner'

// import { useHistory } from 'react-router'

import { AddLessonButton } from './AddLessonButton/AddLessonButton'
import { useQuery } from '@apollo/client'
import { ListItem } from './ListItem/ListItem'
import { LESSONS_QUERY } from './LESSONS_QUERY'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { Header } from 'shared/Header/Header'

import PropTypes from 'prop-types'
import { AccessGateway } from './AccessGateway' // move to shared

export const LessonsPage = () => {
  const { data, refetch, loading } = useQuery(LESSONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const lessons = data && data.lessons ? data.lessons : []

  return (
    <AccessGateway role="admin">
      <Layout>
        <Header
          title="Aulas"
          loading={loading}
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
  userData: PropTypes.object,
  userDataLoading: PropTypes.bool,
}
