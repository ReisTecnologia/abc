import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Description } from './Description'
import { EditableElement } from '../EditableElement'
import { ElementWrapper } from './ElementWrapper'
import { renderElement } from './renderElement'
import { addBucketPrefixes } from './addBucketPrefixes'

const SHOW_DESCRIPTIONS = true

export const Elements = ({ elements, editable }) => {
  const [actualElement, setActualElement] = useState(0)

  return elements.map(
    (
      elementParams,
      index
    ) => {
      const { urlAudios, urlAudio, urlVideo, description, words, type } = elementParams
      const { fullUrlAudio, fullUrlVideo, fullUrlWords } = addBucketPrefixes(
        {urlAudios,urlAudio,urlVideo,words}
      )
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
        description,
      )
      return (
        <ElementWrapper key={index}>
          {editable ?
            <EditableElement
              onUp={() => console.log('up')}
              onDown={() => console.log('down')}
            >
              {element}
            </EditableElement> :
            element
          }
          {SHOW_DESCRIPTIONS && (
            <Description elementParams={elementParams}/>
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
      description: PropTypes.string,
      text: PropTypes.string,
      words: PropTypes.array,
    })
  ),
}
