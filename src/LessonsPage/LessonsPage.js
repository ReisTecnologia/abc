import React from 'react'
import { useQuery } from '@apollo/client'
import { AddLessonButton } from './AddLessonButton/AddLessonButton'
import { ListItem } from './ListItem/ListItem'
import { Spinner } from '../shared/Spinner'
import { LESSONS_QUERY } from './LESSONS_QUERY'
import { Header, Title, PageActions } from './LessonsPage.styles.js'

export const LessonsPage = () => {
  const { data, refetch, loading } = useQuery(LESSONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const lessons = data && data.lessons ? data.lessons : []

  return (
    <>
      <Header>
        <Title>Aulas</Title>
        {loading && <Spinner />}
        <PageActions>
          <AddLessonButton afterAdd={refetch} />
        </PageActions>
      </Header>
      {lessons.map((lesson) => (
        <ListItem key={lesson.id} lesson={lesson} />
      ))}
    </>
  )
}
