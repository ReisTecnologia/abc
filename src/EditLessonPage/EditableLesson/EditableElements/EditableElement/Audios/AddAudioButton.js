import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddButton } from '../AddButton.js'
import { colors } from 'shared/colors'

export const AudioButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -30px;
`

export const AddAudioButton = ({ onClick }) => {
  return (
    <AudioButtonWrapper>
      <AddButton onClick={onClick} color={colors.grayText}></AddButton>
    </AudioButtonWrapper>
  )
}

AddAudioButton.propTypes = {
  onClick: PropTypes.func,
}
