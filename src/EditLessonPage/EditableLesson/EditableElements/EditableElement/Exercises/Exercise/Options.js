import React from 'react'
import PropTypes from 'prop-types'
import { TextAndInput } from '_shared/TextAndInput'
import { colors } from '_shared/colors'
import { TextInputWrapper, Label } from './Exercise.styles'

export const Options = ({ options, changeOptions }) => {
  const optionsString = options ? options.join() : null

  return (
    <TextInputWrapper>
      <Label>Alternativas:</Label>
      <TextAndInput
        value={optionsString}
        onChange={changeOptions}
        color={colors.dimmedPrimary}
      />
    </TextInputWrapper>
  )
}

Options.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  changeOptions: PropTypes.func,
}
