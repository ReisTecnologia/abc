import React from 'react'
import { ViewableElements } from './ViewableElements'

const Template = (args) => <ViewableElements {...args} />

export default {
  title: 'Elements/ViewableElements',
  component: ViewableElements,
  argTypes: { onComplete: { action: 'onComplete' } },
}

const defaultArgs = {
  elements: [
    {
      type: 'Audio',
      description: 't3',
      audios: [
        {
          url: 'a1.m4a',
          name: 'a um',
        },
      ],
    },
    {
      type: 'ClickLetterInTheTextTask',
      correctLetters: ['a', 'r'],
      text: 'Letra A',
      audios: [
        {
          name: 'a um',
          url: 'a1.m4a',
        },
      ],
    },
    {
      type: 'ClickWordStartingWithALetterInTheTextTask',
      letter: 'a',
      description: 't6',
      text: 'Letra A',
      audios: [{ name: 'a um', url: 'a1.m4a' }],
    },
    {
      type: 'Video',
      description: 'Boca falando o som "ã"',
      videos: [
        {
          name: 'video um',
          url: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/small.mp4',
        },
      ],
    },
    {
      type: 'LetterAndAudio',
      letter: 'A',
      description: 't2',
      audios: [{ name: 'a um', url: 'a1.m4a' }],
    },
    {
      type: 'CheckFirstLetter',
      description: 't4. certa, errada',
      audios: [
        { name: 'a um', url: 'a1.m4a' },
        { name: 'a um', url: 'a1.m4a' },
        { name: 'a um', url: 'a1.m4a' },
      ],
      words: [
        {
          word: 'beleza',
          urlWord: 'a1.m4a',
          startsWithTheLetter: false,
          urlRightAnswerExplanation: 'a2.m4a',
          urlWrongAnswerExplanation: 'a3.m4a',
        },
        {
          word: 'alimento',
          urlWord: 'a1.m4a',
          startsWithTheLetter: true,
          urlRightAnswerExplanation: 'a2.m4a',
          urlWrongAnswerExplanation: 'a3.m4a',
        },
      ],
    },
  ],
}

export const BasicViewableElements = Template.bind({})
BasicViewableElements.args = {
  elements: defaultArgs.elements,
}
