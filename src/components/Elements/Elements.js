import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Element } from './Element/Element'
import ErrorBoundary from '../ErrorBoundary'

export const Elements = ({ elements, editable }) => {
  const [innerElements, setInnerElements] = useState(elements)
  const [actualElement, setActualElement] = useState(0)

  return innerElements.map((elementParams, index) => (
    <ErrorBoundary key={index}>
      <Element
        innerElements={innerElements}
        setInnerElements={setInnerElements}
        editable={editable}
        elementParams={elementParams}
        index={index}
        actualElement={actualElement}
        setActualElement={setActualElement}
      />
    </ErrorBoundary>
  ))
}

Elements.propTypes = {
  editable: PropTypes.bool,
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      letter: PropTypes.string,
      correctLetters: PropTypes.arrayOf(PropTypes.string),
      urlAudios: PropTypes.arrayOf(PropTypes.string),
      urlVideo: PropTypes.string,
      description: PropTypes.string,
      text: PropTypes.string,
      words: PropTypes.array,
    })
  ),
}
