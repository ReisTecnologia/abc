import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'

const Wrapper = styled.div`
  text-align: right;
  @media (max-width: 376px) {
    display: none;
  }
`
const MobileWrapper = styled.div`
  text-align: right;
  @media (min-width: 376px) {
    display: none;
  }
`

const DeleteWordButtonBuilder = (size, deleteWord) => (
  <Icon
    icon={trashIcon}
    onClick={deleteWord}
    color={colors.grayText}
    height={size}
    cursor="pointer"
  />
)

export const DeleteWordButton = ({ deleteWord }) => (
  <>
    <Wrapper>{DeleteWordButtonBuilder('25', deleteWord)}</Wrapper>
    <MobileWrapper>{DeleteWordButtonBuilder('22', deleteWord)}</MobileWrapper>
  </>
)

DeleteWordButton.propTypes = {
  deleteWord: PropTypes.func,
}
