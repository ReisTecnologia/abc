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
      correctLetters: ['a', 'r'],
      texto: 'StartsWithLetterTextTask',
      text: 'Letra A',
      type: 'ClickLetterInTheTextTask',
      urlAudio: 'a1.m4a',
    },
    {
      letter: 'a',
      texto: 't6',
      text: 'Letra A',
      type: 'ClickWordStartingWithALetterInTheTextTask',
      urlAudio: 'a1.m4a',
    },
    {
      texto: 't3',
      type: 'Audio',
      urlAudio: 'a1.m4a',
    },
    {
      texto: 'Boca falando o som "ã"',
      type: 'Video',
      urlVideo: 'small.mp4',
    },
    {
      letter: 'A',
      texto: 't2',
      type: 'LetterAndAudio',
      urlAudio: 'a1.m4a',
    },
    {
      texto: 't5',
      type: 'Audio',
      urlAudio: 'a2.m4a',
    },
    {
      texto: 't4. certa, errada',
      type: 'CheckFirstLetter',
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
    // ,
    // {
    //   texto: 'ClickWordStartingWithALetterInTheTextTask',
    //   type: 'ClickWordStartingWithALetterInTheTextTask',
    //   urlAudio: 'a1.m4a',
    // },
  ],
}
