import React from 'react'
import { Elements } from './Elements'

const Template = (args) => <Elements {...args} />

export default {
  title: 'Elements/Elements',
  component: Elements,
  argTypes: { onComplete: { action: 'onComplete' } },
}

const defaultArgs = {
  elements: [
    {
      type: 'ClickLetterInTheTextTask',
      correctLetters: ['a', 'r'],
      text: 'Letra A',
      audioUrls: ['a1.m4a'],
    },
    {
      type: 'ClickWordStartingWithALetterInTheTextTask',
      letter: 'a',
      description: 't6',
      text: 'Letra A',
      audioUrls: ['a1.m4a'],
    },
    {
      type: 'Audio',
      description: 't3',
      audioUrls: ['a1.m4a'],
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
      audioUrls: ['a1.m4a'],
    },
    {
      type: 'Audio',
      description: 't5',
      audioUrls: ['a2.m4a'],
    },
    {
      type: 'CheckFirstLetter',
      description: 't4. certa, errada',
      audioUrls: ['a1.m4a', 'a2.m4a', 'a3.m4a'],
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

export const BasicElements = Template.bind({})
BasicElements.args = {
  elements: defaultArgs.elements,
}

export const EditableElements = Template.bind({})
EditableElements.args = {
  editable: true,
  elements: defaultArgs.elements,
}