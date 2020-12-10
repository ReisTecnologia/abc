import React from 'react'
import { Wrapper } from './Wrapper'
import PropTypes from 'prop-types'
import { Word } from './Word'

export const Paragraph = ({
  color,
  words,
  onLetterClick,
  correctLetters = [],
  wrongLetters = [],
  clearStatus = false,
}) => {
  console.log('Paragraph::color', color)
  return (
    <Wrapper>
      {words.map((word, wordIndex) => {
        const correctLettersReducer = (result, letter) =>
          letter[0] === wordIndex ? [...result, letter[1]] : result
        const correctLettersOnly = correctLetters.reduce(
          correctLettersReducer,
          []
        )
        const wrongLettersOnly = wrongLetters.reduce(correctLettersReducer, [])
        return (
          <Word
            key={wordIndex}
            color={color}
            word={word}
            marginLeft={wordIndex === 0 ? '2rem' : null}
            onLetterClick={(event, letterIndex) =>
              onLetterClick(event, { letterIndex, wordIndex })
            }
            clearStatus={clearStatus}
            correctLetters={correctLettersOnly}
            wrongLetters={wrongLettersOnly}
          />
        )
      })}
    </Wrapper>
  )
}

Paragraph.propTypes = {
  color: PropTypes.string,
  words: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  correctLetters: PropTypes.array.isRequired,
  wrongLetters: PropTypes.array.isRequired,
  onLetterClick: PropTypes.func.isRequired,
  clearStatus: PropTypes.bool.isRequired,
}
