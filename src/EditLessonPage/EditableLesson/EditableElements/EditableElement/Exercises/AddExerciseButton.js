import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddButton } from '../AddButton.js'
import { colors } from '_shared/colors'

const ExerciseButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -10px;
`

export const AddExerciseButton = ({ onClick }) => {
  return (
    <ExerciseButtonWrapper>
      <AddButton onClick={onClick} color={colors.grayText}></AddButton>
    </ExerciseButtonWrapper>
  )
}

AddExerciseButton.propTypes = {
  onClick: PropTypes.func,
}
