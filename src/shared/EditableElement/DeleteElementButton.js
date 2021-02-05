import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../shared/colors'

const Wrapper = styled.div`
  padding: 3px 20px;
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.primary};
  border-radius: 7px;
  cursor: pointer;
`

export const DeleteElementButton = ({ deleteElement }) => {
  return <Wrapper onClick={deleteElement}>apagar</Wrapper>
}

DeleteElementButton.propTypes = {
  deleteElement: PropTypes.func,
}
