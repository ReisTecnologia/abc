import React from 'react'
import { AddLessonButton } from './AddLessonButton/AddLessonButton'
import { ListItem } from './ListItem/ListItem'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { Header } from 'shared/Header/Header'
import PropTypes from 'prop-types'

export const LessonsPage = ({ lessons, refetch }) => {
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
LessonsPage.propTypes = {
  lessons: PropTypes.object,
  refetch: PropTypes.func,
}
