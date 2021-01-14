import React from 'react'
import { EditableElementWrapper } from './EditableElementWrapper'
import PropTypes from 'prop-types'
import { UpDownWrapper } from './UpDownWrapper'
import { Button } from './Button'

export const EditableElement = ({
  children,
  onUp,
  onDown,
  canMoveUp,
  canMoveDown,
}) => {
  return (
    <EditableElementWrapper>
      {children}
      <UpDownWrapper>
        {canMoveUp ? <div /> : <Button onClick={onUp}>up</Button>}
        {canMoveDown ? <div /> : <Button onClick={onDown}>down</Button>}
      </UpDownWrapper>
    </EditableElementWrapper>
  )
}

EditableElement.propTypes = {
  children: PropTypes.object,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  canMoveDown: PropTypes.bool,
  canMoveUp: PropTypes.bool,
}
