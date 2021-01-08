import React from 'react'
import { AudioElement } from '../../AudioElement'
import { ClickWordStartingWithALetterInTheTextTaskElement } from '../../ClickWordStartingWithALetterInTheTextTaskElement'
import { ClickLetterInTheTextTaskElement } from '../../ClickLetterInTheTextTaskElement'
import { LetterAndAudioElement } from '../../LetterAndAudioElement'
import { VideoElement } from '../../VideoElement'
import { CheckFirstLetter } from '../../CheckFirstLetter'

export const renderElement = (
  {
    type,
    correctLetters,
    letter,
    audioUrls,
    urlVideo,
    description,
    words,
    text,
  },
  onComplete,
  actual,
  index
) => {
  switch (type) {
    case 'LetterAndAudio':
      return (
        <LetterAndAudioElement
          onComplete={onComplete}
          actual={actual}
          key={index}
          letter={letter}
          audioUrls={audioUrls}
        />
      )
    case 'Audio':
      return (
        <AudioElement
          onComplete={onComplete}
          actual={actual}
          key={index}
          audioUrls={audioUrls}
        />
      )
    case 'Video':
      return (
        <VideoElement
          onComplete={onComplete}
          actual={actual}
          key={index}
          urlVideo={urlVideo}
        />
      )
    case 'CheckFirstLetter':
      return (
        <CheckFirstLetter
          onComplete={onComplete}
          actual={actual}
          key={index}
          audioUrls={audioUrls}
          conclusionAudio={audioUrls[1]}
          words={words}
        />
      )
    case 'ClickWordStartingWithALetterInTheTextTask':
      return (
        <ClickWordStartingWithALetterInTheTextTaskElement
          onComplete={onComplete}
          actual={actual}
          key={index}
          audioUrls={audioUrls}
          letter={letter}
          text={text}
        />
      )
    case 'ClickLetterInTheTextTask':
      return (
        <ClickLetterInTheTextTaskElement
          onComplete={onComplete}
          actual={actual}
          key={index}
          audioUrls={audioUrls}
          correctLetters={correctLetters}
          text={text}
        />
      )
    default:
      throw new Error(`Unknown element type: ${type}`)
  }
}
