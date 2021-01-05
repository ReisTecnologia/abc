import React from 'react'
import { AudioElement } from '../AudioElement'
import { ClickWordStartingWithALetterInTheTextTaskElement } from '../ClickWordStartingWithALetterInTheTextTaskElement'
import { ClickLetterInTheTextTaskElement } from '../ClickLetterInTheTextTaskElement'
import { LetterAndAudioElement } from '../LetterAndAudioElement'
import { VideoElement } from '../VideoElement'
import { CheckFirstLetter } from '../CheckFirstLetter'

export const renderElement = (
  {
    type,
    correctLetters,
    letter,
    urlAudio,
    urlAudios,
    urlVideo,
    texto,
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
          src={urlAudio}
        />
      )
    case 'Audio':
      return (
        <AudioElement
          onComplete={onComplete}
          actual={actual}
          key={index}
          src={urlAudio}
        />
      )
    case 'Video':
      return (
        <VideoElement
          onComplete={onComplete}
          actual={actual}
          key={index}
          src={urlVideo}
        />
      )
    case 'CheckFirstLetter':
      return (
        <CheckFirstLetter
          onComplete={onComplete}
          actual={actual}
          key={index}
          src={urlAudio}
          conclusionAudio={urlAudio[1]}
          words={words}
        />
      )
    case 'ClickWordStartingWithALetterInTheTextTask':
      return (
        <ClickWordStartingWithALetterInTheTextTaskElement
          onComplete={onComplete}
          actual={actual}
          key={index}
          urlAudio={urlAudio}
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
          urlAudio={urlAudio}
          correctLetters={correctLetters}
          text={text}
        />
      )
    default:
      throw new Error(`Unknown element type: ${type}`)
  }
}
