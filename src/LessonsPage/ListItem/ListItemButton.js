import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '_shared/colors'
import { ViewButton } from '_shared/ViewButton'

const Wrapper = styled.div`
  display: flex;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1.25rem;
  align-items: center;
  color: ${colors.grayText};
  cursor: pointer;
  &:hover {
    color: ${colors.primary};
  }
  @media (max-width: 500px) {
    padding-right: 1rem;
    padding-left: 1rem;
  }
`

export const ListItemButton = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <ViewButton />
    </Wrapper>
  )
}

ListItemButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
}
