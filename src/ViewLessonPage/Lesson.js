import React from 'react'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { Header } from 'shared/Header/Header'
import { ViewableElements } from './ViewableElements/ViewableElements'
import { LessonItem } from './LessonItem'
import { Link, useHistory } from 'react-router-dom'
import { EditLessonButton } from './EditLessonButton'
import PropTypes from 'prop-types'
import { colors } from 'shared/colors'

export const Lesson = ({ menuId, lesson }) => {
  let history = useHistory()
  const navigateToEditLesson = () => {
    history.push(`/editLesson/${lesson.id}`)
  }
  return (
    <Layout>
      <Header
        lessonIcon={
          <Link to={`/viewMenu/${menuId}`}>
            <LessonItem initials={lesson.initials} image={lesson.image} />
          </Link>
        }
        adminPageActions={
          <EditLessonButton
            color={colors.white}
            onClick={navigateToEditLesson}
          />
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
