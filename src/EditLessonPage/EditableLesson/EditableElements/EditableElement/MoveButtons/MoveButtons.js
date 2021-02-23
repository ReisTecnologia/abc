import React from 'react'
import PropTypes from 'prop-types'
import { UpDownWrapper } from './UpDownWrapper'
import { Icon } from '@iconify/react'
import arrowUpSquareFill from '@iconify-icons/bi/arrow-up-square-fill'
import arrowDownSquareFill from '@iconify-icons/bi/arrow-down-square-fill'
import { colors } from 'shared/colors'
import styled from 'styled-components'

export const IIcon = styled(Icon)`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : null)};
`

export const MoveButtons = ({ canMoveDown, canMoveUp, onUp, onDown }) => {
  return (
    <UpDownWrapper>
      <IIcon
        icon={arrowUpSquareFill}
        onClick={canMoveUp && onUp}
        color={canMoveUp ? colors.grayText : colors.light}
        height="30"
        cursor={() => (!canMoveUp ? null : 'pointer')}
      />

      <IIcon
        icon={arrowDownSquareFill}
        onClick={canMoveDown && onDown}
        color={canMoveDown ? colors.grayText : colors.light}
        height="30"
        cursor={() => (!canMoveDown ? null : 'pointer')}
        style={{ marginLeft: 20, marginRight: 10 }}
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
