import React from 'react'

import { LetterAndAudioElement } from './LetterAndAudioElement'

export default {
  title: 'Elements/LetterAndAudio',
  component: LetterAndAudioElement,
}

const Template = (args) => <LetterAndAudioElement {...args} />

export const Primary = Template.bind({})
Primary.args = {
  letter: 'A',
  audioUrls: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a'],
}

export const Actual = Template.bind({})
Actual.args = {
  letter: 'A',
  actual: true,
  audioUrls: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a'],
}
