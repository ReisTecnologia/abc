import React from 'react'
import { Wrapper } from './Wrapper'
import PropTypes from 'prop-types'

export const Letter = ({ letter, color }) => {
  const checkIfLetter = (letter) => {
    if (letter === ',') return ''
    else if (letter === '.') return ''
    else if (letter === '"') return ''
    else if (letter === "'") return ''
    else return letter
  }
  const onlyLetter = checkIfLetter(letter)

  return <Wrapper color={color}>{onlyLetter.toUpperCase()}</Wrapper>
}
Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  color: PropTypes.string,
}
