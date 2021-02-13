import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../../colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'
const Wrapper = styled.div`
  text-align: right;
  margin-top: 7px;
`

export const DeleteWordButton = ({ deleteWord }) => (
  <Wrapper>
    <Icon
      icon={trashIcon}
      onClick={deleteWord}
      color={colors.pink}
      height="30"
      cursor="pointer"
    />
  </Wrapper>
)

DeleteWordButton.propTypes = {
  deleteWord: PropTypes.string,
}
