import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'

const Wrapper = styled.div`
  text-align: right;
  margin-top: 8px;
  margin-right: 8px;
`

export const DeleteLessonButton = ({ deleteLesson }) => (
  <Wrapper>
    <Icon
      icon={trashIcon}
      onClick={deleteLesson}
      color={colors.grayText}
      height="25"
      cursor="pointer"
    />
  </Wrapper>
)

DeleteLessonButton.propTypes = {
  deleteLesson: PropTypes.func,
}
