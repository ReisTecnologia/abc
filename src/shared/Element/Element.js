import React from 'react'
import { AudioElement } from '../AudioElement'
import { ClickWordStartingWithALetterInTheTextTaskElement } from '../ClickWordStartingWithALetterInTheTextTaskElement'
import { ClickLetterInTheTextTaskElement } from '../ClickLetterInTheTextTaskElement'
import { LetterAndAudioElement } from '../LetterAndAudioElement'
import { VideoElement } from '../VideoElement'
import { CheckFirstLetter } from '../CheckFirstLetter'
import PropTypes from 'prop-types'
import { addBucketPrefixesToElementParams } from './addBucketPrefixesToElementParams'

export const Element = ({ elementParams, actual, onComplete }) => {
  const elementParamsWithBucketUrls = addBucketPrefixesToElementParams(
    elementParams
  )

  const {
    type,
    correctLetters,
    letter,
    audios,
    urlVideo,
    words,
    text,
    conclusionAudio,
  } = elementParamsWithBucketUrls

  switch (type) {
    case 'LetterAndAudio':
      return (
        <LetterAndAudioElement
          onComplete={onComplete}
          actual={actual}
          letter={letter}
          audios={audios}
        />
      )
    case 'Audio':
      return (
        <AudioElement onComplete={onComplete} actual={actual} audios={audios} />
      )
    case 'Video':
      return (
        <VideoElement
          onComplete={onComplete}
          actual={actual}
          urlVideo={urlVideo}
        />
      )
    case 'CheckFirstLetter':
      return (
        <CheckFirstLetter
          onComplete={onComplete}
          actual={actual}
          audios={audios}
          conclusionAudio={conclusionAudio && conclusionAudio.url}
          words={words}
        />
      )
    case 'ClickWordStartingWithALetterInTheTextTask':
      return (
        <ClickWordStartingWithALetterInTheTextTaskElement
          onComplete={onComplete}
          actual={actual}
          audios={audios}
          letter={letter}
          text={text}
        />
      )
    case 'ClickLetterInTheTextTask':
      return (
        <ClickLetterInTheTextTaskElement
          onComplete={onComplete}
          actual={actual}
          audios={audios}
          correctLetters={correctLetters}
          text={text}
        />
      )
    default:
      throw new Error(`Unknown element type: ${type}`)
  }
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
    audios: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    conclusionAudio: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
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
