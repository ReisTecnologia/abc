import React from 'react'
import PropTypes from 'prop-types'
import { LessonItem } from '_shared/LessonItem'
import {
  Wrapper,
  IconWrapper,
  IconAndNameWrapper,
  LessonNameWrapper,
} from './MenuPage.styles'
import { Link } from 'react-router-dom'

export const FullMenu = ({ menu, showFullMenu }) => {
  return (
    <>
      {showFullMenu && (
        <Wrapper>
          {menu.elements.map(({ lesson }) => (
            <>
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
            </>
          ))}
        </Wrapper>
      )}
    </>
  )
}

FullMenu.propTypes = {
  menu: PropTypes.object,
  showFullMenu: PropTypes.bool,
}
