import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddButton } from '../AddButton.js'
import { colors } from '_shared/colors'

const InitialAudioButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -30px;
`

export const AddInitialAudioButton = ({ onClick }) => {
  return (
    <InitialAudioButtonWrapper>
      <AddButton onClick={onClick} color={colors.grayText}></AddButton>
    </InitialAudioButtonWrapper>
  )
}

AddInitialAudioButton.propTypes = {
  onClick: PropTypes.func,
}
