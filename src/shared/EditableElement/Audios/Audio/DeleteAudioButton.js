import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../../colors'

const Wrapper = styled.div`
  text-align: center;
  color: ${colors.red};
  margin-top: 7px;
  cursor: pointer;
`

export const DeleteAudioButton = ({ deleteAudio }) => (
  <Wrapper onClick={deleteAudio}>Delete</Wrapper>
)

DeleteAudioButton.propTypes = {
  deleteAudio: PropTypes.string,
}
