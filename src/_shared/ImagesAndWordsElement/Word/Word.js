import React from 'react'
import { Wrapper } from './Wrapper'
import PropTypes from 'prop-types'
import { Letter } from './Letter/Letter'
import { colors } from '_shared/colors'

const replaceMissingLetter = (letter, missingLetters) =>
  missingLetters.includes(letter) ? '_' : letter

export const Word = ({ word, missingLetters, clearStatus }) => {
  const letterArray = word.split('')
  return (
    <Wrapper>
      {letterArray.map((letter, letterIndex) => {
        const filteredLetters = replaceMissingLetter(letter, missingLetters)
        return (
          <Letter
            key={letterIndex}
            letter={filteredLetters}
            color={clearStatus ? colors.textClear : null}
          />
        )
      })}
    </Wrapper>
  )
}

Word.propTypes = {
  word: PropTypes.string.isRequired,
  missingLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  clearStatus: PropTypes.bool,
}
