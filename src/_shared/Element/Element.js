import React from 'react'
import { AudioElement } from '_shared/AudioElement'
import { ClickWordStartingWithALetterInTheTextTaskElement } from '_shared/ClickWordStartingWithALetterInTheTextTaskElement'
import { ClickLetterInTheTextTaskElement } from '_shared/ClickLetterInTheTextTaskElement'
import { LetterAndAudioElement } from '_shared/LetterAndAudioElement'
import { VideoElement } from '_shared/VideoElement'
import { CheckFirstLetter } from '_shared/CheckFirstLetter'
import { ItemsAndAudiosElement } from '_shared/ItemsAndAudiosElement/ItemsAndAudiosElement'
import PropTypes from 'prop-types'
import { addBucketPrefixesToElementParams } from './addBucketPrefixesToElementParams'
import { ImagesAndWordsElement } from '_shared/ImagesAndWordsElement/ImagesAndWordsElement'

export const Element = ({ elementParams, actual, onComplete }) => {
  const elementParamsWithBucketUrls = addBucketPrefixesToElementParams(
    elementParams
  )

  const {
    type,
    correctLetters,
    letter,
    audios,
    videos,
    words,
    text,
    conclusionAudio,
    items,
    initialAudio,
    exercises,
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
        <VideoElement onComplete={onComplete} actual={actual} videos={videos} />
      )
    case 'CheckFirstLetter':
      return (
        <CheckFirstLetter
          onComplete={onComplete}
          actual={actual}
          audios={audios}
          conclusionAudio={conclusionAudio}
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
    case 'ItemsAndAudios':
      return (
        <ItemsAndAudiosElement
          onComplete={onComplete}
          actual={actual}
          items={items}
          initialAudio={initialAudio}
          conclusionAudio={conclusionAudio}
        />
      )
    case 'ImagesAndWords':
      return (
        <ImagesAndWordsElement
          onComplete={onComplete}
          actual={actual}
          exercises={exercises}
          initialAudio={initialAudio}
          conclusionAudio={conclusionAudio}
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
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    description: PropTypes.string,
    text: PropTypes.string,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        startsWithTheLetter: PropTypes.bool,
        urlRightAnswerExplanation: PropTypes.string,
        rightAnswerExplanation: PropTypes.string,
        urlWord: PropTypes.string,
        urlWrongAnswerExplanation: PropTypes.string,
        wrongAnswerExplanation: PropTypes.string,
        word: PropTypes.string,
      })
    ),
  }),
  moveUp: PropTypes.func,
  moveDown: PropTypes.func,
  canMoveUp: PropTypes.bool,
  canMoveDown: PropTypes.bool,
  onComplete: PropTypes.func,
}
