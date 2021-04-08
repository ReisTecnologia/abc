import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddButton } from '../AddButton.js'
import { colors } from 'shared/colors'

const VideoButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -10px;
`

export const AddVideoButton = ({ onClick }) => {
  return (
    <VideoButtonWrapper>
      <AddButton onClick={onClick} color={colors.grayText}></AddButton>
    </VideoButtonWrapper>
  )
}

AddVideoButton.propTypes = {
  onClick: PropTypes.func,
}
