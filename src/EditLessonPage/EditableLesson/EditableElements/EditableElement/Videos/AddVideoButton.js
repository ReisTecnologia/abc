import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const VideoButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -30px;
`
export const VideoButtonInnerWrapper = styled.div`
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

export const AddVideoButton = ({ onClick }) => {
  return (
    <VideoButtonWrapper>
      <VideoButtonInnerWrapper onClick={onClick}>
        Adicionar novo vídeo
      </VideoButtonInnerWrapper>
    </VideoButtonWrapper>
  )
}

AddVideoButton.propTypes = {
  onClick: PropTypes.func,
}
