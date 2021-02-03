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
    const newAudioUrl = `${uuidv4()}.m4a`
    newElementParams.audioUrls = [
      ...elementParams.audios,
      { url: newAudioUrl, name: 'new name' },
    ]
    updateElementParams(newElementParams)
  }
  const changeDescription = (newDescription) => {
    updateElementParams({
      ...elementParams,
      description: newDescription,
    })
  }
  const { type, description, audios, urlVideo } = elementParams
  return (
    <Wrapper>
      <ElementType>{type}</ElementType>
      <TextInput value={description} onChange={changeDescription} />
      <br />
      <b>Audios</b>:
      {audios &&
        audios.map(({ name, url }) => (
          <span key={url}>
            <br />
            <b>{name}</b>
            <br />
            <Audio audioUrl={url} key={url} />
          </span>
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
    audios: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    urlVideo: PropTypes.string,
  }),
  updateElementParams: PropTypes.func,
}
