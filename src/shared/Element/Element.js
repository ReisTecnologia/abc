// import React from 'react'
import PropTypes from 'prop-types'
import { addBucketPrefixesToElementParams } from './addBucketPrefixesToElementParams'
import { renderElement } from './renderElement'

export const Element = ({ elementParams, actual, onComplete }) => {
  const elementParamsWithBucketUrls = addBucketPrefixesToElementParams(
    elementParams
  )

  return renderElement({
    elementParamsWithBucketUrls,
    actual,
    onComplete,
  })
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
  onComplete: PropTypes.func,
}
