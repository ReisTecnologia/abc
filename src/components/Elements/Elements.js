import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Description } from './Description'
import { EditableElement } from '../EditableElement'
import { ElementWrapper } from './ElementWrapper'
import { renderElement } from './renderElement'
import { addBucketPrefixes } from './addBucketPrefixes'
import ErrorBoundary from '../ErrorBoundary'

const SHOW_DESCRIPTIONS = true

export const Elements = ({ elements, editable }) => {
  const [innerElements, setInnerElements] = useState(elements)
  const [actualElement, setActualElement] = useState(0)

  return innerElements.map(
    (
      elementParams,
      index
    ) => {
      const { urlAudios, urlVideo, description, words, type } = elementParams
      console.log('urlVideo', urlVideo)
      const { fullUrlAudios, fullUrlVideo, fullUrlWords } = addBucketPrefixes(
        {urlAudios, urlVideo, words}
      )
      console.log('fullUrlVideo - - - -', fullUrlVideo)
      const moveUp = (index) => {
        const reorderedInnerElements = [...innerElements]
        reorderedInnerElements[index - 1] = innerElements[index]
        reorderedInnerElements[index] = innerElements[index-1]
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
      const element = renderElement(
        {
          ...elementParams,
          urlAudios: fullUrlAudios,
          urlVideo: fullUrlVideo,
          words: fullUrlWords,
        },
        onComplete,
        actual,
        index,
        description,
      )
      return (
        <ErrorBoundary key={index}>
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
            {SHOW_DESCRIPTIONS && <Description elementParams={elementParams} />}
          </ElementWrapper>
        </ErrorBoundary>
      )
    }
  )
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
