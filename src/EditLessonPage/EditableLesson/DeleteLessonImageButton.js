import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'

const Wrapper = styled.div`
  @media (min-width: 376px) {
    text-align: right;
    display: flex;
    align-items: center;
    padding-left: 7px;
    padding-right: 10px;
    padding-bottom: 4px;
    cursor: pointer;
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
    display: flex;
    align-items: center;
    padding-left: 7px;
    padding-right: 10px;
    padding-bottom: 3px;
    cursor: pointer;
  }
`

const DeleteLessonImageButtonBuilder = (size, deleteImageUrl) => (
  <Icon
    icon={trashIcon}
    onClick={deleteImageUrl}
    color={colors.white}
    height={size}
    cursor="pointer"
  />
)

export const DeleteLessonImageButton = ({ setImageUrl }) => {
  const deleteImageUrl = () => {
    setImageUrl('')
  }
  return (
    <>
      <Wrapper>{DeleteLessonImageButtonBuilder('23', deleteImageUrl)}</Wrapper>
      <MobileWrapper>
        {DeleteLessonImageButtonBuilder('18', deleteImageUrl)}
      </MobileWrapper>
    </>
  )
}

DeleteLessonImageButton.propTypes = {
  setImageUrl: PropTypes.func,
}
