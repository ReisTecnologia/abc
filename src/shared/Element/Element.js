import React from 'react'
import { ElementWrapper } from './ElementWrapper'
import PropTypes from 'prop-types'
import { addBucketPrefixesToElementParams } from './addBucketPrefixesToElementParams'
import { renderElement } from './renderElement'
import { Description } from './Description'
import { EditableElement } from '../EditableElement'

export const Element = ({
  actual,
  elementParams,
  editable,
  setActualElement,
  moveUp,
  moveDown,
  canMoveUp,
  canMoveDown,
}) => {
  const onComplete = () => {
    setActualElement((actualElement) => actualElement + 1)
  }

  const elementParamsWithBucketUrls = addBucketPrefixesToElementParams(
    elementParams
  )
  const element = renderElement({
    elementParamsWithBucketUrls,
    onComplete,
    actual,
  })

  return (
    <ElementWrapper>
      {editable ? (
        <EditableElement
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          onUp={moveUp}
          onDown={moveDown}
        >
          {element}
        </EditableElement>
      ) : (
        element
      )}
      {editable && <Description elementParams={elementParamsWithBucketUrls} />}
    </ElementWrapper>
  )
}

Element.propTypes = {
  editable: PropTypes.bool,
  actual: PropTypes.bool,
  setElements: PropTypes.func,
  setActualElement: PropTypes.func,
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
  moveUp: PropTypes.func,
  moveDown: PropTypes.func,
  canMoveUp: PropTypes.bool,
  canMoveDown: PropTypes.bool,
}
