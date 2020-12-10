import React from 'react'
import { Icon } from './Icon'

const Template = (args) => <Icon {...args} />

export default {
  title: 'Lib/Icon',
  component: Icon,
}

export const BasicPlayIcon = Template.bind({})
BasicPlayIcon.args = {
  shape: 'Play',
}

export const DifferentColor = Template.bind({})
DifferentColor.args = {
  color: '#B5BBC0',
}

export const Small = Template.bind({})
Small.args = {
  size: 20,
}

export const Speaker = Template.bind({})
Speaker.args = {
  shape: 'Speaker',
}

export const ThumbsDown = Template.bind({})
ThumbsDown.args = {
  shape: 'ThumbsDown',
}

export const ThumbsUp = Template.bind({})
ThumbsUp.args = {
  shape: 'ThumbsUp',
}
