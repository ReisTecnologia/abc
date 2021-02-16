import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const AudioButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -30px;
`
export const AudioButtonInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 8px 10px;
  background-color: #017970;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
`

export const AddAudioButton = ({ onClick }) => {
  return (
    <AudioButtonWrapper>
      <AudioButtonInnerWrapper onClick={onClick}>
        Novo áudio
      </AudioButtonInnerWrapper>
    </AudioButtonWrapper>
  )
}

AddAudioButton.propTypes = {
  onClick: PropTypes.func,
}
