import React, { useState, useEffect } from 'react'
import { Word } from './Word/Word'
import { ItemImage } from './ItemImage'
import { ItemButton } from './ItemButton'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonsWrapper = styled.div`
  justify-content: center;
  align-items: center;
  font-family: Karla;
  display: flex;
  margin-bottom: 20px;
`
const Wrapper = styled.div`
  margin-top: 20px;
`

export const Items = ({ actualItem, onStepComplete }) => {
  const [word, setWord] = useState(actualItem.item)
  const [answer, setAnswer] = useState([])
  const [missingLetters, setMissingLetters] = useState(actualItem.correctAnswer)

  const answerIsCorrect =
    answer.every((item) => actualItem.correctAnswer.includes(item)) &&
    answer.length > 0

  const answerIsComplete = missingLetters.length === 0

  const addNewAnswer = (newAnswer) => {
    if (actualItem.correctAnswer.includes(newAnswer)) {
      const completeAnswer = [...answer, newAnswer]
      setAnswer(completeAnswer)
    }
  }

  useEffect(() => {
    if (answerIsCorrect && !answerIsComplete) {
      setMissingLetters(
        actualItem.correctAnswer.filter((letter) => !answer.includes(letter))
      )
    }
    if (answerIsCorrect && answerIsComplete) {
      setTimeout(() => {
        setAnswer([])
        onStepComplete()
        setWord(null)
      }, 3000)
    }
  }, [
    actualItem.correctAnswer,
    answer,
    answerIsComplete,
    answerIsCorrect,
    onStepComplete,
  ])

  useEffect(() => {
    setMissingLetters(actualItem.correctAnswer)
    setWord(actualItem.item)
  }, [actualItem.correctAnswer, actualItem.item, onStepComplete])
  return (
    <Wrapper>
      <ItemImage image={actualItem.url} />
      <Word
        word={word}
        missingLetters={missingLetters}
        clearStatus={answerIsComplete}
      />
      <ButtonsWrapper>
        {actualItem.options.map((letter, index) => (
          <ItemButton
            key={index}
            letter={letter}
            addNewAnswer={addNewAnswer}
            correctLetters={actualItem.correctAnswer}
          />
        ))}
      </ButtonsWrapper>
    </Wrapper>
  )
}

Items.propTypes = {
  items: PropTypes.array,
  actualItem: PropTypes.object,
  setActualItem: PropTypes.func,
  onStepComplete: PropTypes.func,
}
