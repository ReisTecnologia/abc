import React from 'react'
import { Word } from './Word'

const Template = (args) => <Word {...args} />

export default {
  title: 'Lib/TextWord/Paragraph/Word',
  component: Word,
  argTypes: { onClick: { action: 'onClick' } },
}

export const BasicWord = Template.bind({})
BasicWord.args = {
  word: 'Alambrado',
}

export const CorrectWord = Template.bind({})
CorrectWord.args = {
  word: 'Alambrado',
  answerStatus: 'correct',
}

export const PunctuatedWord = Template.bind({})
PunctuatedWord.args = {
  word: 'Alambrado,',
  answerStatus: 'correct',
}

export const WrongWord = Template.bind({})
WrongWord.args = {
  word: 'Alambrado',
  answerStatus: 'wrong',
}

export const ClearWord = Template.bind({})
ClearWord.args = {
  word: 'Alambrado',
  answerStatus: 'clear',
}

export const MarginLeft = Template.bind({})
MarginLeft.args = {
  word: 'Alambrado',
  answerStatus: 'wrong',
  marginLeft: '40px',
}
