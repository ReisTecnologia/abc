import React, { useState, useCallback } from 'react'
import { LessonSelect } from './LessonSelect'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useOnClickOutside } from 'shared/useOnClickOutside'

export const Wrapper = styled.div`
  cursor: pointer;
  width: 25%;
`

export const LessonName = ({ lessonId, onSelect, lessons, defaultSelect }) => {
  const [showSelect, setShowSelect] = useState(false)
  const toggleSelect = () => setShowSelect(true)
  const filterLessonById = (id) => lessons.filter((lesson) => lesson.id === id)
  const LessonName =
    lessons.length > 0 ? filterLessonById(lessonId)[0].name : '...'

  const hideSelect = useCallback(() => {
    setShowSelect(false)
  }, [setShowSelect])
  const ref = useOnClickOutside(hideSelect)
  return (
    <Wrapper ref={ref} onClick={toggleSelect}>
      {showSelect ? (
        <LessonSelect
          onSelect={onSelect}
          lessons={lessons}
          selected={LessonName}
          defaultSelect={defaultSelect}
        />
      ) : (
        LessonName
      )}
    </Wrapper>
  )
}

LessonName.propTypes = {
  lessonId: PropTypes.string,
  onSelect: PropTypes.func,
  lessons: PropTypes.array,
  defaultSelect: PropTypes.string,
}
