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
  initialAudio: [{ name: 'initialAudio', url: 'a1.m4a' }],
  conclusionAudio: [{ name: 'conclusionAudio', url: 'a2.m4a' }],
  audios: [{ name: 'a um', url: 'a1.m4a' }],
}

export const Actual = Template.bind({})
Actual.args = {
  items: ['A', 'Ba', 'Palavra'],
  actual: true,
  initialAudio: [{ name: 'initialAudio', url: 'a1.m4a' }],
  conclusionAudio: [{ name: 'conclusionAudio', url: 'a3.m4a' }],
  audios: [{ name: 'a um', url: 'a1.m4a' }],
}
