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
  audios: [
    {
      name: 'a um',
      url: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    },
  ],
}

export const Actual = Template.bind({})
Actual.args = {
  actual: true,
  audios: [
    {
      name: 'a um',
      url: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    },
  ],
}

export const Trails = Template.bind({})
Trails.args = {
  audios: [
    {
      name: 'a um',
      url: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    },
    {
      name: 'a dois',
      url: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
    },
    {
      name: 'a três',
      url: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
    },
  ],
}
