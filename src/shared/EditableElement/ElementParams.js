import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AudioInput } from './AudioInput'
import { AddAudioButton } from './AddAudioButton'
import { v4 as uuidv4 } from 'uuid'

const Text = styled.div`
  padding: 0px 21px;
  color: #555;
  text-align: left;
`

const ElementType = styled.div`
  margin-bottom: 5px;
`

export const ElementParams = ({ elementParams, updateElementParams, id }) => {
  const addAudio = () => {
    const newElementParams = { ...elementParams }
    const newAudioName = `${uuidv4()}.m4a`
    newElementParams.audioUrls = [...elementParams.audioUrls, newAudioName]
    updateElementParams(newElementParams)
  }
  const { type, description, audioUrls, urlVideo } = elementParams
  return (
    <Text>
      <ElementType>{type}</ElementType>
      {description}
      <br />
      <AudioInput id={id} audioUrls={audioUrls} />
      <AddAudioButton onClick={addAudio} />
      <br />
      <b>urlVideo</b>: {urlVideo}
    </Text>
  )
}

ElementParams.propTypes = {
  id: PropTypes.string.isRequired,
  elementParams: PropTypes.shape({
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    audioUrls: PropTypes.arrayOf(PropTypes.string.isRequired),
    urlVideo: PropTypes.string.isRequired,
  }),
  updateElementParams: PropTypes.func,
}
