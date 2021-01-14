import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Element } from '../../shared/Element/Element'
import ErrorBoundary from '../../shared/ErrorBoundary'

export const ViewableElements = ({ elements }) => {
  const [actualElement, setActualElement] = useState(0)

  const onComplete = useCallback(() => {
    setActualElement((actualValue) => {
      return actualValue + 1
    })
  }, [setActualElement])

  return elements.map((elementParams, index) => (
    <ErrorBoundary key={index}>
      <Element
        actual={actualElement === index}
        onComplete={onComplete}
        editable={false}
        elementParams={elementParams}
        setActualElement={setActualElement}
      />
    </ErrorBoundary>
  ))
}

ViewableElements.propTypes = {
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
