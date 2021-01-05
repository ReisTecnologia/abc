import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Text } from './Text'
import { EditableElement } from '../EditableElement'
import { ElementWrapper } from './ElementWrapper'
import { renderElement } from './renderElement'

const SHOW_TEXTOS = false

const bucketUrlPrefix = 'https://alfabetiza.s3-sa-east-1.amazonaws.com/'
const addBucketPrefix = (relativeUri) =>
  relativeUri ? bucketUrlPrefix + relativeUri : null
const addBucketPrefixToWords = (words) =>
  words.map((word) => ({
    ...word,
    urlWord: addBucketPrefix(word.urlWord),
    urlRightAnswerExplanation: addBucketPrefix(word.urlRightAnswerExplanation),
    urlWrongAnswerExplanation: addBucketPrefix(word.urlWrongAnswerExplanation),
  }))


export const Elements = ({ elements, editable }) => {
  const [actualElement, setActualElement] = useState(0)

  return elements.map(
    (
      elementParams,
      index
    ) => {
      const { urlAudios, urlAudio, urlVideo, texto, words } = elementParams

      const fullUrlAudio = urlAudios
        ? urlAudios.map(addBucketPrefix)
        : addBucketPrefix(urlAudio)
      const fullUrlVideo = addBucketPrefix(urlVideo)

      const actual = actualElement === index
      const onComplete = () => {
        setActualElement(() => index + 1)
      }
      const element = renderElement(
        {
          ...elementParams,
          urlAudio: fullUrlAudio,
          urlVideo: fullUrlVideo,
          words: words && addBucketPrefixToWords(words),
        },
        onComplete,
        actual,
        index,
        texto,
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
