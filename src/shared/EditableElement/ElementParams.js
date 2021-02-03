import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Audio } from './Audio/Audio'
import { AddAudioButton } from './AddAudioButton'
import { v4 as uuidv4 } from 'uuid'
import { TextInput } from './TextInput'

const Wrapper = styled.div`
  padding: 0px 21px;
  color: #555;
  text-align: left;
  width: 100%;
`

const ElementType = styled.div`
  margin-bottom: 5px;
`

export const ElementParams = ({ elementParams, updateElementParams }) => {
  const addAudio = () => {
    const newElementParams = { ...elementParams }
    const newAudioName = `${uuidv4()}.m4a`
    newElementParams.audioUrls = [...elementParams.audioUrls, newAudioName]
    updateElementParams(newElementParams)
  }
  const changeDescription = (newDescription) => {
    updateElementParams({
      ...elementParams,
      description: newDescription,
    })
  }
  const { type, description, audioUrls, urlVideo } = elementParams
  return (
    <Wrapper>
      <ElementType>{type}</ElementType>
      <TextInput value={description} onChange={changeDescription} />
      <br />
      <b>Audio Urls</b>:
      {audioUrls &&
        audioUrls.map((audioUrl) => (
          <Audio audioUrl={audioUrl} key={audioUrl} />
        ))}
      <AddAudioButton onClick={addAudio} />
      <br />
      <b>urlVideo</b>: {urlVideo}
    </Wrapper>
  )
}

ElementParams.propTypes = {
  elementParams: PropTypes.shape({
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    audioUrls: PropTypes.arrayOf(PropTypes.string.isRequired),
    urlVideo: PropTypes.string,
  }),
  updateElementParams: PropTypes.func,
}
