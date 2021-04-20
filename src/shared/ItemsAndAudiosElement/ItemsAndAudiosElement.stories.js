import React from 'react'

import { ItemsAndAudiosElement } from './ItemsAndAudiosElement'

export default {
  title: 'Elements/ItemsAndAudios',
  component: ItemsAndAudiosElement,
}

const Template = (args) => <ItemsAndAudiosElement {...args} />

export const Primary = Template.bind({})
Primary.args = {
  items: ['A', 'Ba', 'Palavra'],
  initialAudio: [{ name: 'initialAudio', url: '' }],
  conclusionAudio: [{ name: 'conclusionAudio', url: '' }],
  audios: [{ name: 'a um', url: 'a1.m4a' }],
}

export const Actual = Template.bind({})
Actual.args = {
  letter: 'A',
  actual: true,
  audios: [{ name: 'a um', url: 'a1.m4a' }],
}
