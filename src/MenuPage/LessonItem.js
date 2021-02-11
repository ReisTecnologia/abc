import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: solid 1px #999;
  color: #999;
  border-radius: 5px;
  width: 3rem;
  height: 3rem;
  font-size: 3rem;
  text-align: center;
  font-family: Karla;
`

export const LessonItem = ({ initials }) => {
  return <Wrapper>karla{initials}</Wrapper>
}

LessonItem.propTypes = {
  initials: PropTypes.string,
}
