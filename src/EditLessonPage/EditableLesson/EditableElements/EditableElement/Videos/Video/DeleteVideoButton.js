import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '_shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'

const Wrapper = styled.div`
  text-align: right;
  margin-top: 7px;
  @media (max-width: 376px) {
    display: none;
  }
`
const MobileWrapper = styled.div`
  text-align: right;
  margin-top: 7px;
  @media (min-width: 376px) {
    display: none;
  }
`
const DeleteVideoButtonBuilder = (size, deleteVideo) => (
  <Icon
    icon={trashIcon}
    onClick={deleteVideo}
    color={colors.grayText}
    height={size}
    cursor="pointer"
  />
)

export const DeleteVideoButton = ({ deleteVideo }) => (
  <>
    <Wrapper>{DeleteVideoButtonBuilder('25', deleteVideo)}</Wrapper>
    <MobileWrapper>{DeleteVideoButtonBuilder('22', deleteVideo)}</MobileWrapper>
  </>
)

DeleteVideoButton.propTypes = {
  deleteVideo: PropTypes.func,
}
