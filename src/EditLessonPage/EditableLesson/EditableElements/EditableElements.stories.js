import React from 'react'
import { EditableElements } from './EditableElements'

const Template = (args) => <EditableElements {...args} />

export default {
  title: 'Elements/EditableElements',
  component: EditableElements,
  argTypes: { setInnerElements: { action: 'setInnerElements' } },
}

const defaultArgs = {
  innerElements: [
    {
      type: 'Audio',
      description: 't3',
      audios: [
        {
          name: 'a um',
          url: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
        },
      ],
    },
    {
      type: 'ClickLetterInTheTextTask',
      correctLetters: ['a', 'r'],
      text: 'Letra A',
      audios: [{ name: 'a um', url: 'a1.m4a' }],
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
          url: 'small.mp4',
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
          rightAnswerExplanation: 'Explicação em caso de resposta certa',
          urlWrongAnswerExplanation: 'a3.m4a',
          wrongAnswerExplanation: 'Explicação em caso de resposta errada',
        },
        {
          word: 'alimento',
          urlWord: 'a1.m4a',
          startsWithTheLetter: true,
          urlRightAnswerExplanation: 'a2.m4a',
          urlWrongAnswerExplanation: 'a3.m4a',
        },
      ],
      conclusionAudio: '1.m4a',
    },
  ],
}

export const BasicEditableElements = Template.bind({})
BasicEditableElements.args = {
  innerElements: defaultArgs.innerElements,
}
