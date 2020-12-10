import React from 'react'
import { Wrapper } from './Wrapper'
import PropTypes from 'prop-types'
import { InnerWrapper } from './InnerWrapper'

export const Word = ({
  color,
  word,
  answerStatus = 'unanswered',
  marginLeft,
  onClick,
}) => {
  const wordWithoutPunctuation = (word) =>
    word.endsWith('.') || word.endsWith(',') ? word.slice(0, -1) : word

  const punctuation = (word) =>
    word.endsWith('.') || word.endsWith(',') ? word.slice(-1) : null

  const punctuationToAdd = punctuation(word)

  return (
    <Wrapper
      onClick={onClick}
      marginLeft={marginLeft}
      answerStatus={answerStatus}
      color={color}
    >
      {wordWithoutPunctuation(word)}
      {punctuationToAdd && (
        <InnerWrapper color={color} word={word}>
          {punctuationToAdd}
        </InnerWrapper>
      )}
    </Wrapper>
  )
}

Word.propTypes = {
  word: PropTypes.string.isRequired,
  marginLeft: PropTypes.string,
  answerStatus: PropTypes.oneOf(['unanswered', 'correct', 'wrong', 'clear']),
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
}
