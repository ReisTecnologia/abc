import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../shared/colors'

const Wrapper = styled.div`
  display: flex;
  padding-left: 2rem;
  padding-right: 2rem;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primary};
    color: white;
  }
`

export const ListItemButton = ({ text, onClick }) => {
  return <Wrapper onClick={onClick}>{text}</Wrapper>
}

ListItemButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
}
