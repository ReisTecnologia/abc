import React from 'react'
import { AddLessonButton } from './AddLessonButton/AddLessonButton'
import { ListItem } from './ListItem/ListItem'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { Header } from 'shared/Header/Header'
import { sortByName } from 'shared/sortByName'
import PropTypes from 'prop-types'

export const LessonsPage = ({ lessons, refetch }) => {
  const alphabeticalLessons = sortByName(lessons)
  return (
    <Layout>
      <Header
        title="Aulas"
        pageActions={<AddLessonButton afterAdd={refetch} />}
      />
      <Container>
        {alphabeticalLessons.map((lesson) => (
          <ListItem key={lesson.id} lesson={lesson} />
        ))}
      </Container>
    </Layout>
  )
}
LessonsPage.propTypes = {
  lessons: PropTypes.array,
  refetch: PropTypes.func,
}
