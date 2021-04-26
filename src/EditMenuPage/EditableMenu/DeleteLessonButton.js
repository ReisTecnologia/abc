import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '_shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'

const Wrapper = styled.div`
  text-align: right;
  margin-top: 8px;
  margin-right: 8px;
  @media (max-width: 375px) {
    display: none;
  }
`
const MobileWrapper = styled.div`
  text-align: right;
  margin-top: 8px;
  margin-right: 8px;
  @media (min-width: 376px) {
    display: none;
  }
`
const DeleteButtonBuilder = (size, deleteLesson) => (
  <Icon
    icon={trashIcon}
    onClick={deleteLesson}
    color={colors.grayText}
    height={size}
    cursor="pointer"
  />
)

export const DeleteLessonButton = ({ deleteLesson }) => (
  <>
    <Wrapper>{DeleteButtonBuilder('30', deleteLesson)}</Wrapper>
    <MobileWrapper>{DeleteButtonBuilder('25', deleteLesson)}</MobileWrapper>
  </>
)

DeleteLessonButton.propTypes = {
  deleteLesson: PropTypes.func,
}
