import React from 'react'
import { Layout } from '_shared/Layout'
import { Container } from '_shared/Container'
import { Header } from '_shared/Header/Header'
import { ViewableElements } from './ViewableElements/ViewableElements'
import { LessonItem } from './LessonItem'
import { Link, useHistory } from 'react-router-dom'
import { EditLessonButton } from './EditLessonButton'
import PropTypes from 'prop-types'
import { colors } from '_shared/colors'

export const Lesson = ({ menuId, lesson, backgroundImage }) => {
  console.log('lesson', lesson)
  let history = useHistory()
  const navigateToEditLesson = () => {
    history.push(`/editLesson/${lesson.id}`)
  }
  const backgroundImgUrl = menuId
    ? `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${backgroundImage}`
    : null
  return (
    <Layout backgroundImage={backgroundImgUrl}>
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
  backgroundImage: PropTypes.string,
}
