import React from 'react'
import { Wrapper } from './Wrapper'
import PropTypes from 'prop-types'
import { Letter } from './Letter/Letter'
import { colors } from '_shared/colors'

const replaceMissingLetter = (letter, missingLetters) =>
  missingLetters.includes(letter) ? '_' : letter

export const Word = ({
  word,
  missingLetters = [],
  correctLetters = [],
  clearStatus,
  color,
}) => {
  const letterArray = word.split('')
  console.log('missingLetters', missingLetters)
  console.log('correctLetters', correctLetters)
  return (
    <Wrapper>
      {letterArray.map((letter, letterIndex) => {
        const filteredLetters = replaceMissingLetter(letter, missingLetters)
        return (
          <Letter
            key={letterIndex}
            letter={filteredLetters}
            color={clearStatus ? colors.textClear : color}
          />
        )
      })}
    </Wrapper>
  )
}

Word.propTypes = {
  color: PropTypes.string,
  word: PropTypes.string.isRequired,
  missingLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  clearStatus: PropTypes.bool,
}
