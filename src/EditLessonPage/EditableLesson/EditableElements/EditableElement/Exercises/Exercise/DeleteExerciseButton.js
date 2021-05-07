import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '_shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'

const Wrapper = styled.div`
  display: inline;
  float: right;
  text-align: right;
  align-self: center;
  margin-top: -50px;
  @media (max-width: 375px) {
    display: none;
  }
`
const MobileWrapper = styled.div`
  display: inline;
  float: right;
  text-align: right;
  align-self: center;
  margin-top: -50px;
  @media (min-width: 376px) {
    display: none;
  }
`
const DeleteExerciseButtonBuilder = (size, deleteExercise) => (
  <Icon
    icon={trashIcon}
    onClick={deleteExercise}
    color={colors.grayText}
    height={size}
    cursor="pointer"
  />
)

export const DeleteExerciseButton = ({ deleteExercise }) => (
  <>
    <Wrapper>{DeleteExerciseButtonBuilder('25', deleteExercise)}</Wrapper>
    <MobileWrapper>
      {DeleteExerciseButtonBuilder('22', deleteExercise)}
    </MobileWrapper>
  </>
)

DeleteExerciseButton.propTypes = {
  deleteExercise: PropTypes.func,
}
