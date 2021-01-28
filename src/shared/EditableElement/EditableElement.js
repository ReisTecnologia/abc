import React from 'react'
import { EditableElementWrapper } from './EditableElementWrapper'
import PropTypes from 'prop-types'
import { UpDownWrapper } from './UpDownWrapper'
import { ElementControlWrapper } from './ElementControlWrapper'
import { ElementWrapper } from './ElementWrapper'
import { Button } from './Button'
import { ElementParams } from './ElementParams'

export const EditableElement = ({
  children,
  onUp,
  onDown,
  canMoveUp,
  canMoveDown,
  elementParams,
}) => {
  return (
    <EditableElementWrapper>
      <ElementControlWrapper>
        <UpDownWrapper>
          <Button disabled={!canMoveUp} onClick={onUp}>
            up
          </Button>
          <Button disabled={!canMoveDown} onClick={onDown}>
            down
          </Button>
        </UpDownWrapper>
        <ElementParams elementParams={elementParams} />
      </ElementControlWrapper>
      <ElementWrapper>{children}</ElementWrapper>
    </EditableElementWrapper>
  )
}

EditableElement.propTypes = {
  id: PropTypes.string,
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
