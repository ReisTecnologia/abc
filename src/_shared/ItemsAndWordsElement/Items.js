import React, { useState, useEffect } from 'react'
import { Word } from './Word/Word'
import { ItemImage } from './ItemImage'
import { ItemOptions } from './ItemOptions'
import PropTypes from 'prop-types'

export const Items = ({ actualItem, onStepComplete }) => {
  const [answer, setAnswer] = useState([])
  const [missingLetters, setMissingLetters] = useState(actualItem.correctAnswer)

  const answerIsCorrect =
    answer.every((item) => actualItem.correctAnswer.includes(item)) &&
    answer.length > 0

  const answerIsComplete = missingLetters.length === 0

  const addNewAnswer = (newAnswer) => {
    if (actualItem.correctAnswer.includes(newAnswer)) {
      const completeAnswer = [...answer, newAnswer]
      return () => setAnswer(completeAnswer)
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
  }, [actualItem.correctAnswer, onStepComplete])
  return (
    <>
      <div>
        <ItemImage image={actualItem.url} />
        <Word
          word={actualItem.item}
          missingLetters={missingLetters}
          correctLetters={actualItem.correctAnswer}
          clearStatus={answerIsComplete}
        />
        <ItemOptions options={actualItem.options} addNewAnswer={addNewAnswer} />
      </div>
    </>
  )
}

Items.propTypes = {
  items: PropTypes.array,
  actualItem: PropTypes.object,
  setActualItem: PropTypes.func,
  onStepComplete: PropTypes.func,
}
