import React from 'react'
import { Card } from './Card'

const Template = (args) => <Card {...args} />

export default {
  title: 'Lib/Card',
  component: Card,
}

export const BasicCard = Template.bind({})
BasicCard.args = {
  complete: false,
}

export const CompleteCard = Template.bind({})
CompleteCard.args = {
  complete: true,
}
