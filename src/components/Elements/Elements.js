import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Text } from './Text'
import { EditableElement } from '../EditableElement'
import { ElementWrapper } from './ElementWrapper'
import { renderElement } from './renderElement'
import { addBucketPrefixes } from './addBucketPrefixes'
const SHOW_TEXTOS = false

export const Elements = ({ elements, editable }) => {
  const [innerElements, setInnerElements] = useState(elements)
  const [actualElement, setActualElement] = useState(0)

  return innerElements.map(
    (
      elementParams,
      index
    ) => {
      const { urlAudios, urlAudio, urlVideo, texto, words } = elementParams
      const { fullUrlAudio, fullUrlVideo, fullUrlWords } = addBucketPrefixes(
        {urlAudios,urlAudio,urlVideo,words}
      )
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
          urlAudio: fullUrlAudio,
          urlVideo: fullUrlVideo,
          words: fullUrlWords,
        },
        onComplete,
        actual,
        index,
        texto,
      )
      return (
        <ElementWrapper key={index}>
          {editable ? (
            <EditableElement
              canMoveUp={index == 0}
              canMoveDown={index == innerElements.length - 1}
              onUp={() => moveUp(index)}
              onDown={() => moveDown(index)}
            >
              {element}
            </EditableElement>
          ) : (
            element
          )}
          {texto && SHOW_TEXTOS && (
            <Text>
              {texto}
              <br />
              {fullUrlAudio}
              {fullUrlVideo}
            </Text>
          )}
        </ElementWrapper>
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
      urlAudio: PropTypes.string,
      urlAudios: PropTypes.arrayOf(PropTypes.string),
      urlVideo: PropTypes.string,
      texto: PropTypes.string,
      text: PropTypes.string,
      words: PropTypes.array,
    })
  ),
}
