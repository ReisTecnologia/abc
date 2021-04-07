import React from 'react'
import { AddLessonButton } from './AddLessonButton/AddLessonButton'
import { ListItem } from './ListItem/ListItem'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { Header } from 'shared/Header/Header'
import { alphabeticalArray } from 'shared/alphabeticalArray'
import PropTypes from 'prop-types'

export const LessonsPage = ({ lessons, refetch }) => {
  const alphabetialLessons = alphabeticalArray(lessons)
  return (
    <Layout>
      <Header
        title="Aulas"
        pageActions={<AddLessonButton afterAdd={refetch} />}
      />
      <Container>
        {alphabetialLessons.map((lesson) => (
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
