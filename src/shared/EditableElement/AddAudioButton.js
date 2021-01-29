import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const AudioButtonWrapper = styled.div`
  color: #fff;
  padding: 2px 10px;
  background-color: #017970;
  cursor: pointer;
  display: inline-block;
`
export const AddAudioButton = ({ onClick }) => {
  return <AudioButtonWrapper onClick={onClick}>+</AudioButtonWrapper>
}

AddAudioButton.propTypes = {
  onClick: PropTypes.func,
}
