import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'

const Wrapper = styled.div`
  text-align: center;
  color: ${colors.red};
  margin-top: 7px;
  cursor: pointer;
`

export const DeleteConclusionAudioButton = ({ deleteAudio }) => (
  <Wrapper onClick={deleteAudio}>Delete</Wrapper>
)

DeleteConclusionAudioButton.propTypes = {
  deleteAudio: PropTypes.string,
}
