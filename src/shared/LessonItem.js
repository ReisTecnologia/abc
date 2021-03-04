import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'

const Wrapper = styled.div`
  background-color: ${colors.white};
  margin: 10px;
  border: solid 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 6vh;
  min-height: 6vh;
  width: 6vh;
  height: 6vh;
  font-size: 3rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LessonItem = ({ initials }) => {
  return <Wrapper>{initials}</Wrapper>
}

LessonItem.propTypes = {
  initials: PropTypes.string,
}
