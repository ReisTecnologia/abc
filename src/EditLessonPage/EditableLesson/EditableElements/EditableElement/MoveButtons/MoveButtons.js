import React from 'react'
import PropTypes from 'prop-types'
import { UpDownWrapper } from './UpDownWrapper'
import { Icon } from '@iconify/react'
import triangleDown from '@iconify-icons/akar-icons/triangle-down'
import triangleUp from '@iconify-icons/akar-icons/triangle-up'
import { colors } from '_shared/colors'
import styled from 'styled-components'

const IIconUp = styled(Icon)`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : null)};
  margin: 2px 0 0 15px;
`
const IIconDown = styled(Icon)`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : null)};
  margin: 0 15px 2px 0;
`

export const MoveButtons = ({ canMoveDown, canMoveUp, onUp, onDown }) => {
  const cursorDisplayUpArrow = !canMoveUp ? null : 'pointer'
  const cursorDisplayDownArrow = !canMoveDown ? null : 'pointer'
  return (
    <UpDownWrapper>
      <IIconUp
        icon={triangleUp}
        onClick={canMoveUp ? onUp : null}
        color={canMoveUp ? colors.grayText : colors.light}
        height="30"
        cursor={cursorDisplayUpArrow}
      />

      <IIconDown
        icon={triangleDown}
        onClick={canMoveDown ? onDown : null}
        color={canMoveDown ? colors.grayText : colors.light}
        height="30"
        cursor={cursorDisplayDownArrow}
      />
    </UpDownWrapper>
  )
}

MoveButtons.propTypes = {
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  canMoveDown: PropTypes.bool,
  canMoveUp: PropTypes.bool,
}
