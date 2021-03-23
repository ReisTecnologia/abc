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
  @media (max-width: 376px) {
    display: none;
  }
`

const MobileWrapper = styled.div`
  @media (min-width: 376px) {
    display: none;
  }
  @media (max-width: 376px) {
    text-align: right;
  }
`
const DeleteConclusionAudioButtonBuilder = (size, deleteAudio) => (
  <Icon
    icon={trashIcon}
    onClick={deleteAudio}
    color={colors.grayText}
    height={size}
    cursor="pointer"
  />
)

export const DeleteConclusionAudioButton = ({ deleteAudio }) => (
  <>
    <Wrapper onClick={deleteAudio}>
      {DeleteConclusionAudioButtonBuilder('25', deleteAudio)}
    </Wrapper>
    <MobileWrapper>
      {DeleteConclusionAudioButtonBuilder('22', deleteAudio)}
    </MobileWrapper>
  </>
)

DeleteConclusionAudioButton.propTypes = {
  deleteAudio: PropTypes.func,
}
