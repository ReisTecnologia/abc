import React from 'react'
import { TextAndInput } from '_shared/TextAndInput'
import { colors } from '_shared/colors'
import { TextInputWrapper, Label } from './Exercise.styles'
import PropTypes from 'prop-types'

export const ExerciseWord = ({ word, changeWord }) => {
  return (
    <TextInputWrapper>
      <Label>Palavra:</Label>
      <TextAndInput
        value={word}
        onChange={changeWord}
        color={colors.dimmedPrimary}
      />
    </TextInputWrapper>
  )
}

ExerciseWord.propTypes = {
  changeWord: PropTypes.func,
  word: PropTypes.string,
}
