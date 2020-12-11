import React from 'react'
import { AudioElement } from './AudioElement'

const Template = (args) => <AudioElement {...args} />

export default {
  title: 'Elements/AudioElement',
  component: AudioElement,
  onComplete: { action: 'onComplete' },
}

export const Primary = Template.bind({})
Primary.args = {
  src: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
}

export const Actual = Template.bind({})
Actual.args = {
  actual: true,
  src: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
}

export const Trails = Template.bind({})
Trails.args = {
  src: [
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
  ],
}
