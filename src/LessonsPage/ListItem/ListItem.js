import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { ListItemButton } from './ListItemButton'
import { Wrapper, LessonName, LessonButtons } from './ListItem.styles'

const navigateToViewLesson = (history, lessonId) => (e) => {
  e.stopPropagation()
  history.push(`/viewLesson/${lessonId}`)
}

const navigateToEditLesson = (history, lessonId) => (e) => {
  e.stopPropagation()
  history.push(`/editLesson/${lessonId}`)
}

export const ListItem = ({ lesson, allowNavigateToEdit }) => {
  const history = useHistory()

  return (
    <Wrapper
      onClick={allowNavigateToEdit && navigateToEditLesson(history, lesson.id)}
    >
      <LessonName>{lesson.name}</LessonName>
      &nbsp;&nbsp;
      <LessonButtons>
        <ListItemButton onClick={navigateToViewLesson(history, lesson.id)} />
      </LessonButtons>
      <br />
    </Wrapper>
  )
}

ListItem.propTypes = {
  lesson: PropTypes.string,
  allowNavigateToEdit: PropTypes.bool,
}
