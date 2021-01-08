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
    urlAudios,
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
          urlAudios={urlAudios}
        />
      )
    case 'Audio':
      return (
        <AudioElement
          onComplete={onComplete}
          actual={actual}
          key={index}
          urlAudios={urlAudios}
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
          urlAudios={urlAudios}
          conclusionAudio={urlAudios[1]}
          words={words}
        />
      )
    case 'ClickWordStartingWithALetterInTheTextTask':
      return (
        <ClickWordStartingWithALetterInTheTextTaskElement
          onComplete={onComplete}
          actual={actual}
          key={index}
          urlAudios={urlAudios}
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
          urlAudios={urlAudios}
          correctLetters={correctLetters}
          text={text}
        />
      )
    default:
      throw new Error(`Unknown element type: ${type}`)
  }
}
