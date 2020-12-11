import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  color: #fff;
  background: var(--primary-color);
  padding: 1rem 1rem;
  height: 60px;
  position: fixed;
  bottom: 0;
  width: 100%;
`

export const Footer = ({ children }) => <StyledFooter>{children}</StyledFooter>
