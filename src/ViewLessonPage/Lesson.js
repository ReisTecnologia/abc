import React from 'react'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { Header } from 'shared/Header/Header'
import { ViewableElements } from './ViewableElements/ViewableElements'
import { LessonItem } from './LessonItem'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const Lesson = ({ menuId, lesson }) => {
  return (
    <Layout>
      <Header
        lessonIcon={
          <Link to={`/viewMenu/${menuId}`}>
            <LessonItem initials={lesson.initials} image={lesson.image} />
          </Link>
        }
      />
      <Container>
        <ViewableElements elements={lesson.elements} />
      </Container>
    </Layout>
  )
}

Lesson.propTypes = {
  menuId: PropTypes.string,
  lesson: PropTypes.object,
}
