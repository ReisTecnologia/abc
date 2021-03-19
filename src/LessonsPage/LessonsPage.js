import React, { useState, useContext } from 'react'
import { CurrentUserContext } from '../CurrentUserContextProvider'
import { useLazyQuery } from '@apollo/client'
import { AddLessonButton } from './AddLessonButton/AddLessonButton'
import { ListItem } from './ListItem/ListItem'
import { Spinner } from 'shared/Spinner'
import { LESSONS_QUERY } from './LESSONS_QUERY'
import { Title, PageActions } from './LessonsPage.styles.js'
import { Layout } from 'shared/Layout'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { MenuDrawer } from 'shared/MenuDrawer'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'

export const LessonsPage = () => {
  const { userData, userDataLoading } = useContext(CurrentUserContext)
  const [loadedLesson, setLoadedLesson] = useState(false)
  const [loadLessonData, { data, refetch, loading }] = useLazyQuery(
    LESSONS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }
  )

  let history = useHistory()

  const navigateToMenu = () => {
    history.push('/menu')
  }

  const lessons = data && data.lessons ? data.lessons : []
  if (userDataLoading) return <Spinner />

  if (
    (!userDataLoading && userData === undefined) ||
    userData.signedInUser.type !== 'admin'
  ) {
    alert('Você não tem permissões para acessar essa página!')
    navigateToMenu()
  }
  if (!loadedLesson) {
    loadLessonData()
    setLoadedLesson(true)
  }

  return (
    <Layout>
      <HeaderWrapper>
        <MenuDrawer />
        <Title>Aulas</Title>
        {loading && <Spinner />}
        <PageActions>
          <AddLessonButton afterAdd={refetch} />
        </PageActions>
      </HeaderWrapper>
      <Container>
        {lessons.map((lesson) => (
          <ListItem key={lesson.id} lesson={lesson} />
        ))}
      </Container>
    </Layout>
  )
}

LessonsPage.propTypes = {
  userData: PropTypes.object,
  userDataLoading: PropTypes.bool,
}
