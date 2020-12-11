import React from 'react'
import { TextLetter } from './TextLetter'
import { colors } from '../colors'

const Template = (args) => <TextLetter {...args} />

export default {
  title: 'Lib/TextLetter',
  component: TextLetter,
  onComplete: { action: 'onComplete' },
}

const defaultArgs = {
  text: `Avançar com paciência.
Seguir a rota avaliando.`,
  correctLetters: ['p', 'd'],
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
  ...defaultArgs,
  text: `A E I O U, "áÁéÉíÍóÓúÚ", "àÀ" A!`,
  correctLetters: ['a', 'e', 'i', 'o', 'u'],
  color: colors.ready,
}
