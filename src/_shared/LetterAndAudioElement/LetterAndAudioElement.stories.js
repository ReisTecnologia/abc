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
  audios: [{ name: 'a um', url: 'a1.m4a' }],
}

export const Actual = Template.bind({})
Actual.args = {
  letter: 'A',
  actual: true,
  audios: [{ name: 'a um', url: 'a1.m4a' }],
}
