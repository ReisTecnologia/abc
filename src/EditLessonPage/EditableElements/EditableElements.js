import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Element } from '../../shared/Element/Element'
import ErrorBoundary from '../../shared/ErrorBoundary'

export const EditableElements = ({ elements }) => {
  const [innerElements, setInnerElements] = useState(elements)

  return innerElements.map((elementParams, index) => {
    const canMoveUp = index === 0
    const canMoveDown = index === elements.length - 1
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
        <Element
          elements={innerElements}
          setInnerElements={setInnerElements}
          editable={true}
          elementParams={elementParams}
          index={index}
          moveUp={moveUp}
          moveDown={moveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
        />
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
