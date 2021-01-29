import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Element } from '../../shared/Element/Element'
import { EditableElement } from '../../shared/EditableElement/EditableElement'
import ErrorBoundary from '../../shared/ErrorBoundary'

export const EditableElements = ({ elements }) => {
  const [innerElements, setInnerElements] = useState(elements)

  const updateElementParams = useCallback(
    (index, newElementParams) => {
      const newInnerElements = [...innerElements]
      newInnerElements[index] = newElementParams
      setInnerElements(newInnerElements)
    },
    [setInnerElements, innerElements]
  )
  return innerElements.map((elementParams, index) => {
    const canMoveUp = index !== 0
    const canMoveDown = index !== elements.length - 1
    const moveUp = () => {
      const reorderedElements = [...innerElements]
      reorderedElements[index - 1] = innerElements[index]
      reorderedElements[index] = innerElements[index - 1]
      setInnerElements(reorderedElements)
    }

    const moveDown = () => {
      const reorderedElements = [...innerElements]
      reorderedElements[index + 1] = innerElements[index]
      reorderedElements[index] = innerElements[index + 1]
      setInnerElements(reorderedElements)
    }

    return (
      <ErrorBoundary key={index}>
        <EditableElement
          onUp={moveUp}
          onDown={moveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
          elementParams={elementParams}
          updateElementParams={(newElementParams) =>
            updateElementParams(index, newElementParams)
          }
          id={lessonId}
        >
          <Element elementParams={elementParams} />
        </EditableElement>
      </ErrorBoundary>
    )
  })
}

EditableElements.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      letter: PropTypes.string,
      correctLetters: PropTypes.arrayOf(PropTypes.string),
      audioUrls: PropTypes.arrayOf(PropTypes.string),
      urlVideo: PropTypes.string,
      description: PropTypes.string,
      text: PropTypes.string,
      words: PropTypes.array,
    })
  ),
}
