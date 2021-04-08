import React from 'react'
import PropTypes from 'prop-types'
import { UpDownWrapper } from './UpDownWrapper'
import { UpDownWrapperMobile } from './UpDownWrapperMobile'
import { Icon } from '@iconify/react'
import arrowUpSquareFill from '@iconify-icons/bi/arrow-up-square-fill'
import arrowDownSquareFill from '@iconify-icons/bi/arrow-down-square-fill'
import { colors } from 'shared/colors'
import styled from 'styled-components'

const IIcon = styled(Icon)`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : null)};
`

export const MoveButtons = ({ canMoveDown, canMoveUp, onUp, onDown }) => {
  const cursorDisplayUpArrow = !canMoveUp ? null : 'pointer'
  const cursorDisplayDownArrow = !canMoveDown ? null : 'pointer'

  const UpDownButtonsBuilder = (size) => (
    <>
      <IIcon
        icon={arrowUpSquareFill}
        onClick={canMoveUp ? onUp : null}
        color={canMoveUp ? colors.grayText : colors.light}
        height={size}
        cursor={cursorDisplayUpArrow}
      />
      <IIcon
        icon={arrowDownSquareFill}
        onClick={canMoveDown ? onDown : null}
        color={canMoveDown ? colors.grayText : colors.light}
        height={size}
        cursor={cursorDisplayDownArrow}
        style={{ marginLeft: 20, marginRight: 10 }}
      />
    </>
  )
  return (
    <>
      <UpDownWrapper>{UpDownButtonsBuilder('30')}</UpDownWrapper>
      <UpDownWrapperMobile>{UpDownButtonsBuilder('25')}</UpDownWrapperMobile>
    </>
  )
}

MoveButtons.propTypes = {
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  canMoveDown: PropTypes.bool,
  canMoveUp: PropTypes.bool,
}
