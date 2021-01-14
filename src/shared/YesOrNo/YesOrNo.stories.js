import React from 'react'
import { YesOrNo } from './YesOrNo'
import { colors } from '../colors'
const Template = (args) => <YesOrNo {...args} />

export default {
  title: 'Lib/YesOrNo',
  component: YesOrNo,
  argTypes: { onComplete: { action: 'onComplete' } },
}

export const NoIsCorrect = Template.bind({})
NoIsCorrect.args = {
  correctAnswer: 'no',
  urlRightAnswerExplanation:
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
  urlWrongAnswerExplanation:
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
}

export const YesIsCorrect = Template.bind({})
YesIsCorrect.args = {
  correctAnswer: 'yes',
  urlRightAnswerExplanation:
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
  urlWrongAnswerExplanation:
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
}

export const Active = Template.bind({})
Active.args = {
  color: colors.actual,
  correctAnswer: 'yes',
  urlRightAnswerExplanation:
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
  urlWrongAnswerExplanation:
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
}
