import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddButton } from '../AddButton.js'
import { colors } from '_shared/colors'

const ItemButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -10px;
`

export const AddItemButton = ({ onClick }) => {
  return (
    <ItemButtonWrapper>
      <AddButton onClick={onClick} color={colors.grayText}></AddButton>
    </ItemButtonWrapper>
  )
}

AddItemButton.propTypes = {
  onClick: PropTypes.func,
}
