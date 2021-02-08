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

export const DeleteWordButton = ({ deleteWord }) => (
  <Wrapper onClick={deleteWord}>Delete</Wrapper>
)

DeleteWordButton.propTypes = {
  deleteWord: PropTypes.string,
}
