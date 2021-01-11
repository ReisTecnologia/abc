import React from 'react'

import { AudioButton } from './AudioButton'

export default {
  title: 'Lib/AudioButton',
  component: AudioButton,
  argTypes: {
    onClick: { action: 'onClick' },
    onStart: { action: 'onStart' },
    onComplete: { action: 'onComplete' },
    onStepStart: { action: 'onStepStart' },
    onStepComplete: { action: 'onStepComplete' },
  },
}

const Template = (args) => <AudioButton {...args} />

export const WithAudio = Template.bind({})
WithAudio.args = {
  audioUrls: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a'],
}

export const WithWrongAudio = Template.bind({})
WithWrongAudio.args = {
  audioUrls: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/___wrong.m4a'],
}

export const Small = Template.bind({})
Small.args = {
  size: 20,
  audioUrls: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a'],
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  audioUrls: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a'],
}

export const Red = Template.bind({})
Red.args = {
  color: '#900',
  audioUrls: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a'],
}

export const DifferentPlayingColor = Template.bind({})
DifferentPlayingColor.args = {
  playingColor: '#f00',
  audioUrls: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a'],
}

export const AnotherIcon = Template.bind({})
AnotherIcon.args = {
  icon: 'ThumbsDown',
  audioUrls: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a'],
}

export const Trail = Template.bind({})
Trail.args = {
  beforeTrailCount: 1,
  afterTrailCount: 2,
  audioUrls: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a'],
}

export const PlayIconTrailNoneBefore = Template.bind({})
PlayIconTrailNoneBefore.args = {
  beforeTrailCount: 0,
  afterTrailCount: 2,
  audioUrls: ['https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a'],
}

export const AudioSequence = Template.bind({})
AudioSequence.args = {
  audioUrls: [
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
  ],
}

export const LoopAudioSequence = Template.bind({})
LoopAudioSequence.args = {
  loop: true,
  audioUrls: [
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a1.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a2.m4a',
    'https://alfabetiza.s3-sa-east-1.amazonaws.com/a3.m4a',
  ],
}
