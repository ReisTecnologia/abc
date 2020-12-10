import React from 'react'
import { ClickLetterInTheTextTaskElement } from './ClickLetterInTheTextTaskElement'

const Template = (args) => <ClickLetterInTheTextTaskElement {...args} />

export default {
  title: 'Elements/ClickLetterInTheTextTaskElement',
  component: ClickLetterInTheTextTaskElement,
  argTypes: { onComplete: { action: 'onComplete' } },
}

const defaultProps = {
  urlAudio: 'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
  correctLetters: ['d'],
  text:
    'Arabela abria\n a janela.\nCarolina erguia\na cortina.\nE Maria olhava\ne sorria:\n"Bom dia!"',
}

export const BasicClickLetterInTheTextTaskElement = Template.bind({})
BasicClickLetterInTheTextTaskElement.args = {
  ...defaultProps,
}

export const Actual = Template.bind({})
Actual.args = {
  ...defaultProps,
  actual: true,
}
