import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'

const Wrapper = styled.div`
  text-align: right;
`

export const DeleteConclusionAudioButton = ({ deleteAudio }) => (
  <Wrapper onClick={deleteAudio}>
    <Icon
      icon={trashIcon}
      onClick={deleteAudio}
      color={colors.grayText}
      height="25"
      cursor="pointer"
    />
  </Wrapper>
)

DeleteConclusionAudioButton.propTypes = {
  deleteAudio: PropTypes.func,
}
