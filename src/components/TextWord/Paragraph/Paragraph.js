import React from 'react'
import { Wrapper } from './Wrapper'
import PropTypes from 'prop-types'
import { Word } from './Word'

export const Paragraph = ({
  words,
  onWordClick,
  correctWords = [],
  wrongWords = [],
  clearStatus,
  color,
}) => {
  const calculateAnswerStatus = (wordIndex) => {
    if (clearStatus && !correctWords.includes(wordIndex)) {
      return 'clear'
    } else if (correctWords.includes(wordIndex)) {
      return 'correct'
    } else if (wrongWords.includes(wordIndex)) {
      return 'wrong'
    } else {
      return 'unanswered'
    }
  }
  return (
    <Wrapper>
      {words.map((word, wordIndex) => (
        <Word
          key={wordIndex}
          word={word}
          marginLeft={wordIndex === 0 ? '2rem' : null}
          onClick={(event) => onWordClick(event, wordIndex)}
          answerStatus={calculateAnswerStatus(wordIndex)}
          color={color}
        />
      ))}
    </Wrapper>
  )
}

Paragraph.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  onWordClick: PropTypes.func.isRequired,
  correctWords: PropTypes.arrayOf(PropTypes.number.isRequired),
  wrongWords: PropTypes.arrayOf(PropTypes.number.isRequired),
  clearStatus: PropTypes.bool.isRequired,
  color: PropTypes.string,
}
