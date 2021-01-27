import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'

const ButtonWrapper = styled.div`
  background-color: #eee;
  border: #ddd;
  padding: 3px;
  margin: 5px;
  cursor: ${({ disabled }) => (disabled ? null : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#eee' : '#999')};
`

export const Button = ({ children, onClick, disabled }) => (
  <ButtonWrapper disabled={disabled} onClick={disabled ? null : onClick}>
    {children}
  </ButtonWrapper>
)

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  disabled: PropTypes.bool,
}
