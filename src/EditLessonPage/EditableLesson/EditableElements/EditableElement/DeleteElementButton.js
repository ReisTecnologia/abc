import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'

const Wrapper = styled.div`
  padding: 3px 10px;
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.white};
  border-radius: 7px;
  cursor: pointer;
`

export const DeleteElementButton = ({ deleteElement }) => {
  return (
    <Wrapper onClick={deleteElement}>
      <Icon icon={trashIcon} color={colors.pink} height="25" />
    </Wrapper>
  )
}

DeleteElementButton.propTypes = {
  deleteElement: PropTypes.func,
}
