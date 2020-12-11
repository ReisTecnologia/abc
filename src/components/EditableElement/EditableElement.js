import React from 'react'
import { EditableElementWrapper } from './EditableElementWrapper'
import PropTypes from 'prop-types'
import { UpDownWrapper } from './UpDownWrapper'
import { Button } from './Button'

export const EditableElement = ({ children, onUp, onDown }) => {
    return (
      <EditableElementWrapper>
        {children}
        <UpDownWrapper>
          <Button onClick={onUp}>up</Button>
          <Button onClick={onDown}>down</Button>
        </UpDownWrapper>
      </EditableElementWrapper>
    )
}

EditableElement.propTypes = {
  children: PropTypes.string,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
}
