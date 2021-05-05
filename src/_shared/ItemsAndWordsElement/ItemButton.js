import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '_shared/colors'

const Button = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  min-width: 41px;
  border: solid 1px ${colors.primary};
  border-radius: 5px;
  margin: 0px 5px;
  background-color: ${({ answerStatus }) =>
    answerStatus === 'correct'
      ? colors.textClear
      : answerStatus === 'wrong'
      ? colors.textWrong
      : null};
  &:hover {
    cursor: pointer;
  }
`

export const ItemButton = ({ letter, addNewAnswer, correctLetters }) => {
  const [answerStatus, setAnswerStatus] = useState(null)

  const onAnswer = () => {
    if (correctLetters.includes(letter)) {
      addNewAnswer(letter)
      setAnswerStatus('correct')
    } else if (answerStatus === 'wrong') setAnswerStatus(null)
    else setAnswerStatus('wrong')
  }

  useEffect(() => {
    setAnswerStatus(null)
  }, [letter, correctLetters])

  return (
    <Button onClick={onAnswer} answerStatus={answerStatus}>
      {letter.toUpperCase()}
    </Button>
  )
}

ItemButton.propTypes = {
  letter: PropTypes.string,
  addNewAnswer: PropTypes.func,
  correctLetters: PropTypes.array,
}
