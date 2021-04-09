import React, { useEffect, useState } from 'react'
import { RemainingLessons } from './RemainingLessons'
import { LessonItem } from 'shared/LessonItem'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  @media (max-width: 540px) {
    justify-content: center;
  }
`

export const ListImages = ({ lessons }) => {
  const [numberOfLessons, setNumberOfLessons] = useState(null)

  const remainingLessonsNumber =
    numberOfLessons === 0
      ? lessons.length
      : lessons.length - numberOfLessons > 0
      ? `+${lessons.length - numberOfLessons}`
      : null

  const showRemainingLessons =
    remainingLessonsNumber && remainingLessonsNumber !== 0 ? true : false

  const windowWidthMedium = window.matchMedia('(max-width: 720px)')
  const windowWidthSmall = window.matchMedia('(max-width: 540px)')
  const windowWidthMobile = window.matchMedia('(max-width: 360px)')

  useEffect(() => {
    if (windowWidthMobile.matches) {
      setNumberOfLessons(0)
    } else if (windowWidthSmall.matches) {
      setNumberOfLessons(1)
    } else if (windowWidthMedium.matches) {
      setNumberOfLessons(2)
    } else {
      setNumberOfLessons(3)
    }
  }, [windowWidthSmall, windowWidthMedium, windowWidthMobile])

  return (
    <Wrapper>
      {lessons.slice(0, numberOfLessons).map(({ lesson }) => (
        <LessonItem
          key={lesson.id}
          image={lesson.image}
          initials={lesson.initials}
        />
      ))}
      <RemainingLessons
        lessonNumber={remainingLessonsNumber}
        showRemainingLessons={showRemainingLessons}
      />
    </Wrapper>
  )
}

ListImages.propTypes = {
  lessons: PropTypes.array,
}
