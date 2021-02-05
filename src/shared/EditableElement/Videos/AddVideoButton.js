import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const VideoButtonWrapper = styled.div`
  color: #fff;
  padding: 4px 10px;
  background-color: #017970;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
`
export const AddVideoButton = ({ onClick }) => {
  return (
    <VideoButtonWrapper onClick={onClick}>
      Adicionar novo vídeo
    </VideoButtonWrapper>
  )
}

AddVideoButton.propTypes = {
  onClick: PropTypes.func,
}
