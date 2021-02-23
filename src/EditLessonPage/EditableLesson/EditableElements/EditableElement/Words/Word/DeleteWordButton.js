import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'
const Wrapper = styled.div`
  text-align: right;
`

export const DeleteWordButton = ({ deleteWord }) => (
  <Wrapper>
    <Icon
      icon={trashIcon}
      onClick={deleteWord}
      color={colors.grayText}
      height="25"
      cursor="pointer"
    />
  </Wrapper>
)

DeleteWordButton.propTypes = {
  deleteWord: PropTypes.string,
}
