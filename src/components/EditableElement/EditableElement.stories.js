import React from 'react'
import { EditableElement } from './EditableElement'

const Template = (args) => (
  <EditableElement {...args}> element </EditableElement>
)

export default {
  title: 'Lib/EditableElement',
  component: EditableElement,
  argTypes: {
    onUp: { action: 'onUp' },
    onDown: { action: 'onDown' },
  },
}

export const BasicEditableElement = Template.bind({})
BasicEditableElement.args = {}
