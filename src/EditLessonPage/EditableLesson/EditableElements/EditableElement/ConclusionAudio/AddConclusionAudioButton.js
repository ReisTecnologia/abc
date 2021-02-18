import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddButton } from '../AddButton.js'

export const ConclusionAudioButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -30px;
`

export const AddConclusionAudioButton = ({ onClick }) => {
  return (
    <ConclusionAudioButtonWrapper>
      <AddButton onClick={onClick}></AddButton>
    </ConclusionAudioButtonWrapper>
  )
}

AddConclusionAudioButton.propTypes = {
  onClick: PropTypes.func,
}
