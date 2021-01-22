import React from 'react'
import { EditableElementWrapper } from './EditableElementWrapper'
import PropTypes from 'prop-types'
import { UpDownWrapper } from './UpDownWrapper'
import { Button } from './Button'
import { Description } from './Description'

export const EditableElement = ({
  children,
  onUp,
  onDown,
  canMoveUp,
  canMoveDown,
  elementParams,
  id,
}) => {
  return (
    <EditableElementWrapper>
      {children}
      <UpDownWrapper>
        {canMoveUp ? <div /> : <Button onClick={onUp}>up</Button>}
        {canMoveDown ? <div /> : <Button onClick={onDown}>down</Button>}
      </UpDownWrapper>
      <Description elementParams={elementParams} id={id} />
    </EditableElementWrapper>
  )
}

EditableElement.propTypes = {
  children: PropTypes.object,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  canMoveDown: PropTypes.bool,
  canMoveUp: PropTypes.bool,
  elementParams: PropTypes.shape({
    type: PropTypes.string,
    letter: PropTypes.string,
    correctLetters: PropTypes.arrayOf(PropTypes.string),
    audioUrls: PropTypes.arrayOf(PropTypes.string),
    urlVideo: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string,
    words: PropTypes.array,
  }),
}
