import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddButton } from '../AddButton.js'
import { colors } from 'shared/colors'

const ConclusionAudioButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -30px;
`

export const AddConclusionAudioButton = ({ onClick }) => {
  return (
    <ConclusionAudioButtonWrapper>
      <AddButton onClick={onClick} color={colors.grayText}></AddButton>
    </ConclusionAudioButtonWrapper>
  )
}

AddConclusionAudioButton.propTypes = {
  onClick: PropTypes.func,
}
