import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '_shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'

const Wrapper = styled.div`
  text-align: right;
  align-self: center;
  @media (max-width: 375px) {
    display: none;
  }
`
const MobileWrapper = styled.div`
  text-align: right;
  align-self: center;
  @media (min-width: 376px) {
    display: none;
  }
`
const DeleteItemButtonBuilder = (size, deleteItem) => (
  <Icon
    icon={trashIcon}
    onClick={deleteItem}
    color={colors.grayText}
    height={size}
    cursor="pointer"
  />
)

export const DeleteItemButton = ({ deleteItem }) => (
  <>
    <Wrapper>{DeleteItemButtonBuilder('25', deleteItem)}</Wrapper>
    <MobileWrapper>{DeleteItemButtonBuilder('22', deleteItem)}</MobileWrapper>
  </>
)

DeleteItemButton.propTypes = {
  deleteItem: PropTypes.func,
}
