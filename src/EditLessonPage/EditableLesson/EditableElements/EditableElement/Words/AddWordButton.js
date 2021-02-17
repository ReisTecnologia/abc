import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from 'shared/colors'

export const WordButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -30px;
`
export const WordButtonInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 8px 10px;
  background-color: ${colors.dimmedPrimary};
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
`

export const AddWordButton = ({ onClick }) => {
  return (
    <WordButtonWrapper>
      <WordButtonInnerWrapper onClick={onClick}>
        Nova palavra
      </WordButtonInnerWrapper>
    </WordButtonWrapper>
  )
}

AddWordButton.propTypes = {
  onClick: PropTypes.func,
}
