import React from 'react'
import PropTypes from 'prop-types'
import { TextAndInput } from '_shared/TextAndInput'
import { TextInputWrapper, Label } from './Exercise.styles'
import { colors } from '_shared/colors'

export const CorrectAnswers = ({ correctAnswer, changeCorrectAnswers }) => {
  const correctAnswerString = correctAnswer ? correctAnswer.join() : null

  return (
    <TextInputWrapper>
      <Label>Resposta certa:</Label>
      <TextAndInput
        value={correctAnswerString}
        onChange={changeCorrectAnswers}
        color={colors.dimmedPrimary}
      />
    </TextInputWrapper>
  )
}

CorrectAnswers.propTypes = {
  correctAnswer: PropTypes.arrayOf(PropTypes.string),
  changeCorrectAnswers: PropTypes.func,
}
