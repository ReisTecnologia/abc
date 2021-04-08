import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddButton } from '../AddButton.js'
import { colors } from 'shared/colors'

const WordButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -20px;
`

export const AddWordButton = ({ onClick }) => {
  return (
    <WordButtonWrapper>
      <AddButton onClick={onClick} color={colors.grayText}></AddButton>
    </WordButtonWrapper>
  )
}

AddWordButton.propTypes = {
  onClick: PropTypes.func,
}
