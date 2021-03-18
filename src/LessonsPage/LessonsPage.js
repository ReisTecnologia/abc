import React from 'react'
import { useQuery } from '@apollo/client'
import { AddLessonButton } from './AddLessonButton/AddLessonButton'
import { ListItem } from './ListItem/ListItem'
import { Spinner } from 'shared/Spinner'
import { LESSONS_QUERY } from './LESSONS_QUERY'
import { Title, PageActions } from './LessonsPage.styles.js'
import { Layout } from 'shared/Layout'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { MenuDrawer } from 'shared/MenuDrawer'
import { SIGNED_USER_QUERY } from 'shared/SIGNED_USER_QUERY'

export const LessonsPage = () => {
  const { data, refetch, loading } = useQuery(LESSONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const result = useQuery(SIGNED_USER_QUERY)

  console.log('result.data', result.data)

  const isUserAuthenticated =
    result.data && result.data.signedInUser.type === 'admin' ? true : false
  const lessons = data && data.lessons ? data.lessons : []

  return (
    <Layout>
      <HeaderWrapper>
        <MenuDrawer />
        <Title>Aulas</Title>
        {loading && <Spinner />}
        <PageActions>
          {isUserAuthenticated && <AddLessonButton afterAdd={refetch} />}
        </PageActions>
      </HeaderWrapper>
      <Container>
        {lessons.map((lesson) => (
          <ListItem
            key={lesson.id}
            lesson={lesson}
            allowNavigateToEdit={isUserAuthenticated}
          />
        ))}
      </Container>
    </Layout>
  )
}
