import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const WordButtonWrapper = styled.div`
  color: #fff;
  padding: 4px 10px;
  background-color: #017970;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
`
export const AddWordButton = ({ onClick }) => {
  return (
    <WordButtonWrapper onClick={onClick}>
      Adicionar nova palavra
    </WordButtonWrapper>
  )
}

AddWordButton.propTypes = {
  onClick: PropTypes.func,
}
