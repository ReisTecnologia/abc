import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddButton } from '../AddButton.js'

export const AudioButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -30px;
`

export const AddAudioButton = ({ onClick }) => {
  return (
    <AudioButtonWrapper>
      <AddButton onClick={onClick}></AddButton>
    </AudioButtonWrapper>
  )
}

AddAudioButton.propTypes = {
  onClick: PropTypes.func,
}
