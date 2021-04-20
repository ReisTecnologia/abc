import React from 'react'
import { AddLessonButton } from './AddLessonButton/AddLessonButton'
import { ListItem } from './ListItem/ListItem'
import { Layout } from '_shared/Layout'
import { Container } from '_shared/Container'
import { Header } from '_shared/Header/Header'
import { sortByName } from '_shared/sortByName'
import PropTypes from 'prop-types'

export const LessonsPage = ({ lessons, refetch }) => {
  return (
    <Layout>
      <Header
        title="Aulas"
        pageActions={<AddLessonButton afterAdd={refetch} />}
      />
      <Container>
        {sortByName(lessons).map((lesson) => (
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
