import React from 'react'

import { CheckFirstLetter } from './CheckFirstLetter'

const words = [
  {
    word: 'amizade',
    urlWord: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    startsWithTheLetter: true,
    urlRightAnswerExplanation:
      'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
    rightAnswerExplanation: 'Explicação da resposta certa',
    urlWrongAnswerExplanation:
      'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
    wrongAnswerExplanation: 'Explicação da resposta errada',
  },
  {
    word: 'batata',
    urlWord: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
    startsWithTheLetter: false,
    urlRightAnswerExplanation:
      'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    rightAnswerExplanation: 'Explicação da resposta certa',
    urlWrongAnswerExplanation:
      'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
    wrongAnswerExplanation: 'Explicação da resposta errada',
  },
]

export default {
  title: 'Elements/CheckFirstLetter',
  component: CheckFirstLetter,
}

const Template = (args) => <CheckFirstLetter {...args} />

export const Primary = Template.bind({})
Primary.args = {
  words,
  audios: [
    { name: 'a um', url: 'a1.m4a' },
    { name: 'a um', url: 'a1.m4a' },
    { name: 'a um', url: 'a1.m4a' },
  ],
}

export const Actual = Template.bind({})
Actual.args = {
  words,
  actual: true,
  audios: [
    { name: 'a um', url: 'a1.m4a' },
    { name: 'a um', url: 'a1.m4a' },
    { name: 'a um', url: 'a1.m4a' },
  ],
}

export const ActualWithConclusionAudio = Template.bind({})
ActualWithConclusionAudio.args = {
  words,
  actual: true,
  conclusionAudio: { name: 'a um', url: 'a1.m4a' },
  audios: [
    { name: 'a um', url: 'a1.m4a' },
    { name: 'a um', url: 'a1.m4a' },
    { name: 'a um', url: 'a1.m4a' },
  ],
}
