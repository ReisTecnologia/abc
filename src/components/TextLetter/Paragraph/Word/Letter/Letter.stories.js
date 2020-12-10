import React from 'react'
import { Letter } from './Letter'

const Template = (args) => <Letter {...args} />

export default {
  title: 'Lib/TextLetter/Paragraph/Word/Letter',
  component: Letter,
  argTypes: { onClick: { action: 'onClick' } },
}

export const BasicLetter = Template.bind({})
BasicLetter.args = {
  letter: 'a',
}

export const GreenLetter = Template.bind({})
GreenLetter.args = {
  letter: 'a',
  color: 'green',
}
