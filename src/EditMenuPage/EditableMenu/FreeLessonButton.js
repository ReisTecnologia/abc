import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import checkIcon from '@iconify-icons/bi/check'
import bxX from '@iconify-icons/bx/bx-x'

import { colors } from '_shared/colors'
import styled from 'styled-components'

export const WrapperMobile = styled.div`
  display: flex;
  margin-top: 8px;
  margin-right: 17px;
  @media (min-width: 501px) {
    display: none;
  }
`

export const Wrapper = styled.div`
  display: flex;
  margin-top: 8px;
  margin-right: 20px;
  @media (max-width: 500px) {
    display: none;
  }
`

const IIcon = styled(Icon)`
  cursor: pointer;
  background-color: ${colors.grayText};
  border-radius: 5px;
`
const Label = styled.label`
  margin: 14px 15px 0 0;
  @media (max-width: 500px) {
    font-size: 15px;
  }
`

export const FreeLessonButton = ({ freeLesson, onClick }) => {
  const FreeLessonButtonBuilder = (size) => (
    <>
      {freeLesson && (
        <IIcon
          icon={checkIcon}
          onClick={() => onClick(false)}
          color={colors.white}
          height={size}
        />
      )}
      {!freeLesson && (
        <IIcon
          icon={bxX}
          onClick={() => onClick(true)}
          color={colors.white}
          height={size}
        />
      )}
    </>
  )
  return (
    <>
      <Label>Grátis?</Label>

      <Wrapper>{FreeLessonButtonBuilder('30')}</Wrapper>
      <WrapperMobile>{FreeLessonButtonBuilder('25')}</WrapperMobile>
    </>
  )
}

FreeLessonButton.propTypes = {
  freeLesson: PropTypes.bool,
  onClick: PropTypes.func,
}
