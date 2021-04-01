import React from 'react'
import { AddLessonButton } from './AddLessonButton/AddLessonButton'
import { useQuery } from '@apollo/client'
import { ListItem } from './ListItem/ListItem'
import { LESSONS_QUERY } from './LESSONS_QUERY'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { Header } from 'shared/Header/Header'

export const LessonsPage = () => {
  const { data, refetch, loading } = useQuery(LESSONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const lessons = data && data.lessons ? data.lessons : []

  return (
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
  )
}
