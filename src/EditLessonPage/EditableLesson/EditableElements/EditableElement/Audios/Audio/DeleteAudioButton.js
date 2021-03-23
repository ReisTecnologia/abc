import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'

const Wrapper = styled.div`
  @media (min-width: 376px) {
    text-align: right;
  }
  @media (max-width: 375px) {
    display: none;
  }
`
const MobileWrapper = styled.div`
  @media (min-width: 376px) {
    display: none;
  }
  @media (max-width: 375px) {
    text-align: right;
  }
`
const DeleteAudioButtonBuilder = (size, deleteAudio) => (
  <Icon
    icon={trashIcon}
    onClick={deleteAudio}
    color={colors.grayText}
    height={size}
    cursor="pointer"
  />
)

export const DeleteAudioButton = ({ deleteAudio }) => (
  <>
    <Wrapper>{DeleteAudioButtonBuilder('25', deleteAudio)}</Wrapper>
    <MobileWrapper>{DeleteAudioButtonBuilder('22', deleteAudio)}</MobileWrapper>
  </>
)

DeleteAudioButton.propTypes = {
  deleteAudio: PropTypes.func,
}
