import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddButton } from '../AddButton.js'

export const WordButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -30px;
`

export const AddWordButton = ({ onClick }) => {
  return (
    <WordButtonWrapper>
      <AddButton onClick={onClick}></AddButton>
    </WordButtonWrapper>
  )
}

AddWordButton.propTypes = {
  onClick: PropTypes.func,
}
