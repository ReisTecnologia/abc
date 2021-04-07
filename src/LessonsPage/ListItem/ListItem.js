import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { ListItemButton } from './ListItemButton'
import {
  Wrapper,
  LessonName,
  LessonButtons,
  LessonElements,
} from './ListItem.styles'
import { LessonItem } from 'shared/LessonItem'

const navigateToViewLesson = (history, lessonId) => (e) => {
  e.stopPropagation()
  history.push(`/viewLesson/${lessonId}`)
}

const navigateToEditLesson = (history, lessonId) => (e) => {
  e.stopPropagation()
  history.push(`/editLesson/${lessonId}`)
}

export const ListItem = ({ lesson }) => {
  const history = useHistory()

  return (
    <Wrapper onClick={navigateToEditLesson(history, lesson.id)}>
      <LessonItem initials={lesson.initials} image={lesson.image} />
      <LessonName>{lesson.name}</LessonName>
      <LessonElements>{lesson.elements.length} elementos</LessonElements>
      &nbsp;&nbsp;
      <LessonButtons>
        <ListItemButton onClick={navigateToViewLesson(history, lesson.id)} />
      </LessonButtons>
      <br />
    </Wrapper>
  )
}

ListItem.propTypes = {
  lesson: PropTypes.object,
}
