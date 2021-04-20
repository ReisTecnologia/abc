import React from 'react'
import { Word } from './Word'

const Template = (args) => <Word {...args} />

export default {
  title: 'Lib/TextLetter/Paragraph/Word',
  component: Word,
  argTypes: { onLetterClick: { action: 'onLetterClick' } },
}

export const BasicWord = Template.bind({})
BasicWord.args = {
  word: ['A', 'l', 'a', 'm', 'b', 'r', 'a', 'd', 'o'],
}

export const AnsweredWord = Template.bind({})
AnsweredWord.args = {
  word: ['A', 'l', 'a', 'm', 'b', 'r', 'a', 'd', 'o'],
  correctLetters: [2, 4, 6],
  wrongLetters: [0, 1, 3],
}

export const MarginLeft = Template.bind({})
MarginLeft.args = {
  word: ['A', 'l', 'a', 'm', 'b', 'r', 'a', 'd', 'o'],
  correctLetters: [2, 4, 6],
  wrongLetters: [0, 1, 3],
  marginLeft: '40px',
}
