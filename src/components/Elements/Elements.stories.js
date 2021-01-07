import React from 'react'
import { Elements } from './Elements'

const Template = (args) => <Elements {...args} />

export default {
  title: 'Elements/Elements',
  component: Elements,
  argTypes: { onComplete: { action: 'onComplete' } },
}

export const BasicElements = Template.bind({})
BasicElements.args = {
  elements: [
    {
      type: 'ClickLetterInTheTextTask',
      correctLetters: ['a', 'r'],
      text: 'Letra A',
      urlAudios: ['a1.m4a'],
    },
    {
      type: 'ClickWordStartingWithALetterInTheTextTask',
      letter: 'a',
      description: 't6',
      text: 'Letra A',
      urlAudios: ['a1.m4a'],
    },
    {
      type: 'Audio',
      description: 't3',
      urlAudios: ['a1.m4a'],
    },
    {
      type: 'Video',
      description: 'Boca falando o som "ã"',
      urlVideo: 'small.mp4',
    },
    {
      type: 'LetterAndAudio',
      letter: 'A',
      description: 't2',
      urlAudios: ['a1.m4a'],
    },
    {
      type: 'Audio',
      description: 't5',
      urlAudios: ['a2.m4a'],
    },
    {
      type: 'CheckFirstLetter',
      description: 't4. certa, errada',
      urlAudios: ['a1.m4a', 'a2.m4a', 'a3.m4a'],
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
