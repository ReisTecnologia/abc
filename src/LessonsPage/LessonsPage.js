import React from 'react'
import { useQuery } from '@apollo/client'
import { AddLessonButton } from './AddLessonButton/AddLessonButton'
import { ListItem } from './ListItem/ListItem'
import { Spinner } from '../shared/Spinner'
import { LESSONS_QUERY } from './LESSONS_QUERY'
import { Title, PageActions } from './LessonsPage.styles.js'
import { Layout } from 'shared/Layout'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { MenuDrawer } from 'shared/MenuDrawer'

export const LessonsPage = () => {
  const { data, refetch, loading } = useQuery(LESSONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const lessons = data && data.lessons ? data.lessons : []

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
