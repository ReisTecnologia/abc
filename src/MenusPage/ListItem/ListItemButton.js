import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { ViewButton } from 'shared/ViewButton'

const Wrapper = styled.div`
  display: flex;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  color: ${colors.grayText};
  align-items: center;
  cursor: pointer;

  &:hover {
    color: ${colors.primary};
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
