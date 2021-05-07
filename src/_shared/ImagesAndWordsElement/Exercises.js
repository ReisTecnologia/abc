import React, { useState, useEffect } from 'react'
import { Word } from './Word/Word'
import { ExerciseImage } from './ExerciseImage'
import { ExerciseButton } from './ExerciseButton'
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

export const Exercises = ({ actualExercise, onStepComplete }) => {
  const [word, setWord] = useState(actualExercise.word)
  const [answer, setAnswer] = useState([])
  const [missingLetters, setMissingLetters] = useState(
    actualExercise.correctAnswer
  )

  const answerIsCorrect =
    answer.every((letter) => actualExercise.correctAnswer.includes(letter)) &&
    answer.length > 0

  const answerIsComplete = missingLetters.length === 0

  const addNewAnswer = (newAnswer) => {
    if (actualExercise.correctAnswer.includes(newAnswer)) {
      const completeAnswer = [...answer, newAnswer]
      setAnswer(completeAnswer)
    }
  }

  useEffect(() => {
    if (answerIsCorrect && !answerIsComplete) {
      setMissingLetters(
        actualExercise.correctAnswer.filter(
          (letter) => !answer.includes(letter)
        )
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
    actualExercise.correctAnswer,
    answer,
    answerIsComplete,
    answerIsCorrect,
    onStepComplete,
  ])

  useEffect(() => {
    setMissingLetters(actualExercise.correctAnswer)
    setWord(actualExercise.word)
  }, [actualExercise.correctAnswer, actualExercise.word, onStepComplete])
  return (
    <Wrapper>
      <ExerciseImage image={actualExercise.imageUrl} />
      <Word
        word={word}
        missingLetters={missingLetters}
        clearStatus={answerIsComplete}
      />
      <ButtonsWrapper>
        {actualExercise.options.map((letter, index) => (
          <ExerciseButton
            key={index}
            letter={letter}
            addNewAnswer={addNewAnswer}
            correctLetters={actualExercise.correctAnswer}
          />
        ))}
      </ButtonsWrapper>
    </Wrapper>
  )
}

Exercises.propTypes = {
  actualExercise: PropTypes.object,
  onStepComplete: PropTypes.func,
}
