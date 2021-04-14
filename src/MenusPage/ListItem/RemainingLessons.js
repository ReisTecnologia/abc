import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'

const Wrapper = styled.div`
  background-color: ${colors.white};
  margin: 0.5rem 0.5rem 0.5rem 0px;
  border: dashed 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 3rem;
  min-height: 3rem;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const RemainingLessons = ({ lessonNumber, showRemainingLessons }) => {
  return <>{showRemainingLessons && <Wrapper>{lessonNumber}</Wrapper>}</>
}

RemainingLessons.propTypes = {
  lessonNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showRemainingLessons: PropTypes.bool,
}
