import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddButton } from '../AddButton.js'
import { colors } from '_shared/colors'

const AudioButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -10px;
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
