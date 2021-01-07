import React from 'react'

import { CheckFirstLetter } from './CheckFirstLetter'

const words = [
  {
    word: 'amizade',
    urlWord: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    startsWithTheLetter: true,
    urlRightAnswerExplanation:
      'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
    urlWrongAnswerExplanation:
      'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
  },
  {
    word: 'batata',
    urlWord: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
    startsWithTheLetter: false,
    urlRightAnswerExplanation:
      'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    urlWrongAnswerExplanation:
      'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
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
  urlAudios: [
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
  ],
}

export const Actual = Template.bind({})
Actual.args = {
  words,
  actual: true,
  urlAudios: [
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
  ],
}

export const ActualWithConclusionAudio = Template.bind({})
ActualWithConclusionAudio.args = {
  words,
  actual: true,
  conclusionAudio: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
  urlAudios: [
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
  ],
}
