import React from 'react'
import { EditableElementWrapper } from './EditableElementWrapper'
import PropTypes from 'prop-types'
import { UpDownWrapper } from './UpDownWrapper'
import { Button } from './Button'

export const EditableElement = ({ children }) => {
    return (
      <EditableElementWrapper>
        {children}
        <UpDownWrapper>
          <Button>down</Button>
          <Button>up</Button>
        </UpDownWrapper>
      </EditableElementWrapper>
    )
}

EditableElement.propTypes = {
  children: PropTypes.string,
}
