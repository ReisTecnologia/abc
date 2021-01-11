import React from 'react'
import { ElementWrapper } from './ElementWrapper'
import PropTypes from 'prop-types'
import { addBucketPrefixesToElementParams } from './addBucketPrefixesToElementParams'
import { renderElement } from './renderElement'
import { Description } from './Description'
import { EditableElement } from '../../EditableElement'

export const Element = ({
  index,
  elementParams,
  actualElement,
  editable,
  innerElements,
  setInnerElements,
  setActualElement,
}) => {
  const { audioUrls, urlVideo, description, words, type } = elementParams

  const moveUp = (index) => {
    const reorderedInnerElements = [...innerElements]
    reorderedInnerElements[index - 1] = innerElements[index]
    reorderedInnerElements[index] = innerElements[index - 1]
    setInnerElements(reorderedInnerElements)
  }
  const moveDown = (index) => {
    const reorderedInnerElements = [...innerElements]
    reorderedInnerElements[index + 1] = innerElements[index]
    reorderedInnerElements[index] = innerElements[index + 1]
    setInnerElements(reorderedInnerElements)
  }
  const actual = actualElement === index
  const onComplete = () => {
    setActualElement(() => index + 1)
  }

  const elementParamsWithBucketUrls = addBucketPrefixesToElementParams(elementParams)
  const element = renderElement({
    elementParamsWithBucketUrls,
    onComplete,
    actual,
    index,
    description
  })

  return (
    <ElementWrapper>
      {editable ? (
        <EditableElement
          canMoveUp={index === 0}
          canMoveDown={index === innerElements.length - 1}
          onUp={() => moveUp(index)}
          onDown={() => moveDown(index)}
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
  index: PropTypes.number,
  actualElement: PropTypes.number,
  setInnerElements:PropTypes.func,
  setActualElement:PropTypes.func,
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
