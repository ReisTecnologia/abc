import React from 'react'
import { Wrapper } from './Wrapper'
import PropTypes from 'prop-types'
import { InnerWrapper } from './InnerWrapper'

export const Letter = ({ letter, color, onClick }) => {
  const checkIfLetter = (letter) => {
    if (letter === ',') return ''
    else if (letter === '.') return ''
    else if (letter === '"') return ''
    else if (letter === "'") return ''
    else return letter
  }
  const checkIfQuotesOrPunctuation = (letter) => {
    if (letter === ',') return letter
    else if (letter === '.') return letter
    else if (letter === '"') return letter
    else if (letter === "'") return letter
    else return null
  }
  const onlyLetter = checkIfLetter(letter)
  const punctuationAndQuotes = checkIfQuotesOrPunctuation(letter)

  return (
    <Wrapper onClick={onClick} color={color}>
      {onlyLetter.toUpperCase()}
      {punctuationAndQuotes && (
        <InnerWrapper color={color}>{punctuationAndQuotes}</InnerWrapper>
      )}
    </Wrapper>
  )
}
Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
}
