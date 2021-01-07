import React from 'react'
import { ClickWordStartingWithALetterInTheTextTaskElement } from './ClickWordStartingWithALetterInTheTextTaskElement'

const Template = (args) => (
  <ClickWordStartingWithALetterInTheTextTaskElement {...args} />
)

export default {
  title: 'Elements/ClickWordStartingWithALetterInTheTextTaskElement',
  component: ClickWordStartingWithALetterInTheTextTaskElement,
  argTypes: { onComplete: { action: 'onComplete' } },
}

const defaultArgs = {
  urlAudios: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a'],
  letter: 'a',
  text: `Antes de ontem, dona Prudência foi à feira.
    Garantir as compras do mês.`,
}

export const BasicClickWordStartingWithALetterInTheTextTaskElement = Template.bind(
  {}
)
BasicClickWordStartingWithALetterInTheTextTaskElement.args = {
  ...defaultArgs,
}

export const Actual = Template.bind({})
Actual.args = {
  ...defaultArgs,
  actual: true,
}
