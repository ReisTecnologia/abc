import React from 'react'
import { TextWord } from './TextWord'
import { colors } from '../colors'
const Template = (args) => <TextWord {...args} />

export default {
  title: 'Lib/TextWord',
  component: TextWord,
  onComplete: { action: 'onComplete' },
}

const defaultArgs = {
  text: `Avançar com paciência.
Seguir a rota avaliando.
`,
  correctWords: ['avançar', 'avaliando'],
}
export const BasicText = Template.bind({})
BasicText.args = {
  ...defaultArgs,
}

export const Color = Template.bind({})
Color.args = {
  ...defaultArgs,
  color: colors.ready,
}

export const Special = Template.bind({})
Special.args = {
  text: `A tropa ia "avançar" no bolo.
De chocolate.`,
  correctWords: ['avançar', 'chocolate'],
  color: colors.ready,
}
