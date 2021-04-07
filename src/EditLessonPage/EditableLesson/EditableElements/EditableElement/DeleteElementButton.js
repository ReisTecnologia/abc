import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'

const Wrapper = styled.div`
  cursor: pointer;
  float: right;
  padding: 0 0.5rem;
`

export const DeleteElementButton = ({ deleteElement }) => {
  return (
    <Wrapper onClick={deleteElement}>
      <Icon icon={trashIcon} color={colors.grayText} height="30" />
    </Wrapper>
  )
}

DeleteElementButton.propTypes = {
  deleteElement: PropTypes.func,
}
