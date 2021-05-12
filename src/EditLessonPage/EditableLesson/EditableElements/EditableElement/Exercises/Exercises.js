import React from 'react'
import PropTypes from 'prop-types'
import { Exercise } from './Exercise/Exercise'
import { AddExerciseButton } from './AddExerciseButton'

const buildUpdateExercise = ({ exercises, exerciseIndex, changeExercises }) => (
  payload
) => {
  const newExercises = [...exercises]
  newExercises[exerciseIndex] = {
    ...exercises[exerciseIndex],
    ...payload,
  }
  changeExercises(newExercises)
}

const buildDeleteExercise = ({
  exercises,
  exerciseIndex,
  changeExercises,
}) => () => {
  const newExercises = [...exercises]
  newExercises.splice(exerciseIndex, 1)
  if (newExercises[0]) {
    changeExercises(newExercises)
  } else {
    changeExercises([
      {
        word: 'exemplo',
        imageUrl: '',
        options: ['a', 'b', 'c', 'd', 'p'],
        correctAnswer: ['p'],
      },
    ])
  }
}

const buildChangeWord = ({ exercises, exerciseIndex, changeExercises }) => (
  word
) => {
  const newExercises = [...exercises]
  newExercises[exerciseIndex] = {
    ...newExercises[exerciseIndex],
    word,
  }

  changeExercises(newExercises)
}

const buildChangeOptions = ({ exercises, exerciseIndex, changeExercises }) => (
  options
) => {
  const newOptionsArray = options.split(',').map((letters) => letters.trim())
  const newExercises = [...exercises]
  newExercises[exerciseIndex] = {
    ...newExercises[exerciseIndex],
    options: newOptionsArray,
  }

  changeExercises(newExercises)
}

const buildChangeCorrectAnswers = ({
  exercises,
  exerciseIndex,
  changeExercises,
}) => (correctAnswer) => {
  const newCorrectAnswerArray = correctAnswer
    .split(',')
    .map((letters) => letters.trim())
  const newExercises = [...exercises]
  newExercises[exerciseIndex] = {
    ...newExercises[exerciseIndex],
    correctAnswer: newCorrectAnswerArray,
  }

  changeExercises(newExercises)
}

export const Exercises = ({ exercises, changeExercises, imageFilePrefix }) => {
  const addExercise = () =>
    changeExercises([
      ...exercises,
      {
        word: 'exemplo',
        imageUrl: '',
        options: ['a', 'b', 'c', 'd', 'p'],
        correctAnswer: ['p'],
      },
    ])
  console.log('exercises', exercises)

  return (
    <>
      {exercises &&
        exercises.map(
          ({ word, imageUrl, options, correctAnswer }, exerciseIndex) => (
            <Exercise
              imageFilePrefix={imageFilePrefix}
              word={word}
              imageUrl={imageUrl}
              options={options}
              correctAnswer={correctAnswer}
              index={exerciseIndex}
              updateExercise={buildUpdateExercise({
                exercises,
                exerciseIndex,
                changeExercises,
              })}
              deleteExercise={buildDeleteExercise({
                exercises,
                exerciseIndex,
                changeExercises,
              })}
              changeWord={buildChangeWord({
                exercises,
                exerciseIndex,
                changeExercises,
              })}
              changeOptions={buildChangeOptions({
                exercises,
                exerciseIndex,
                changeExercises,
              })}
              changeCorrectAnswers={buildChangeCorrectAnswers({
                exercises,
                exerciseIndex,
                changeExercises,
              })}
              key={exerciseIndex}
            />
          )
        )}
      <AddExerciseButton onClick={addExercise} />
    </>
  )
}

Exercises.propTypes = {
  imageFilePrefix: PropTypes.string,
  exercises: PropTypes.arrayOf(PropTypes.object),
  imageUrl: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  correctAnswer: PropTypes.arrayOf(PropTypes.string),
  changeExercises: PropTypes.func,
}
