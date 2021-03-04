import React from 'react'
import { ViewButton } from 'shared/ViewButton'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-left: 5px;
  position: fixed;
  top: 3px;
`

export const ViewLessonButton = ({ lessonId }) => {
  const history = useHistory()
  const navigateToLesson = () => {
    history.push(`/viewLesson/${lessonId}`)
  }
  return (
    <Wrapper>
      <ViewButton onClick={navigateToLesson} />
    </Wrapper>
  )
}

ViewLessonButton.propTypes = {
  lessonId: PropTypes.string,
}
