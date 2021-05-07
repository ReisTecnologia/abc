import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ExerciseWrapper } from './Exercise.styles'
import { ExerciseImage } from './ExerciseImage'
import { ExerciseWord } from './ExerciseWord'
import { Options } from './Options'
import { CorrectAnswers } from './CorrectAnswers'
import { DeleteExerciseButton } from './DeleteExerciseButton'

export const Exercise = ({
  word,
  imageUrl,
  options,
  correctAnswer,
  updateExercise,
  deleteExercise,
  changeWord,
  changeCorrectAnswers,
  changeOptions,
  imageFilePrefix,
}) => {
  return (
    <Wrapper>
      <ExerciseWrapper>
        <ExerciseImage
          updateExercise={updateExercise}
          imageUrl={imageUrl}
          imageFilePrefix={imageFilePrefix}
        />
        <DeleteExerciseButton deleteExercise={deleteExercise} />
        <ExerciseWord word={word} changeWord={changeWord} />
        <CorrectAnswers
          correctAnswer={correctAnswer}
          changeCorrectAnswers={changeCorrectAnswers}
        />
        <Options options={options} changeOptions={changeOptions} />
      </ExerciseWrapper>
    </Wrapper>
  )
}

Exercise.propTypes = {
  word: PropTypes.string,
  imageFilePrefix: PropTypes.string,
  imageUrl: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  correctAnswer: PropTypes.arrayOf(PropTypes.string),
  changeCorrectAnswers: PropTypes.func,
  changeOptions: PropTypes.func,
  updateExercise: PropTypes.func,
  deleteExercise: PropTypes.func,
  changeWord: PropTypes.func,
}
