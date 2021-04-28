import React from 'react'
import PropTypes from 'prop-types'
import { LessonItem } from '_shared/LessonItem'
import {
  Wrapper,
  IconWrapper,
  IconAndNameWrapper,
  LessonNameWrapper,
  FreeMenuWrapper,
  PaidLessonsOverlay,
} from './MenuPage.styles'
import { Link } from 'react-router-dom'
import { PayWall } from './PayWall'

export const FreeMenu = ({ menu, showFullMenu }) => {
  const freeLessons = menu.elements.filter(
    (element) => element.freeLesson === true
  )
  const paidLessons = menu.elements.filter(
    (element) => element.freeLesson === false
  )
  return (
    <>
      {!showFullMenu && (
        <FreeMenuWrapper>
          <Wrapper>
            {freeLessons.map(({ lesson }) => (
              <Link
                key={lesson.id}
                to={`/viewLesson/${lesson.id}?menuId=${menu.id}`}
              >
                <IconAndNameWrapper>
                  <IconWrapper>
                    <LessonItem
                      initials={lesson.initials}
                      image={lesson.image}
                    />
                  </IconWrapper>
                  <LessonNameWrapper>{lesson.name}</LessonNameWrapper>
                </IconAndNameWrapper>
              </Link>
            ))}
          </Wrapper>
          <PayWall />
          <PaidLessonsOverlay>
            <Wrapper>
              {paidLessons.map(({ lesson }) => (
                <Link
                  key={lesson.id}
                  to={`/viewLesson/${lesson.id}?menuId=${menu.id}`}
                >
                  <IconAndNameWrapper>
                    <IconWrapper>
                      <LessonItem
                        initials={lesson.initials}
                        image={lesson.image}
                      />
                    </IconWrapper>
                    <LessonNameWrapper>{lesson.name}</LessonNameWrapper>
                  </IconAndNameWrapper>
                </Link>
              ))}
            </Wrapper>
          </PaidLessonsOverlay>
        </FreeMenuWrapper>
      )}
    </>
  )
}

FreeMenu.propTypes = {
  showFullMenu: PropTypes.bool,
  menu: PropTypes.object,
}
