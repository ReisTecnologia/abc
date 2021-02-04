import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const AudioButtonWrapper = styled.div`
  color: #fff;
  padding: 4px 10px;
  background-color: #017970;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
`
export const AddAudioButton = ({ onClick }) => {
  return (
    <AudioButtonWrapper onClick={onClick}>
      Adicionar novo áudio
    </AudioButtonWrapper>
  )
}

AddAudioButton.propTypes = {
  onClick: PropTypes.func,
}
