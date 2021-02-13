import React from 'react'
import PropTypes from 'prop-types'
import { Audio } from './Audio/Audio'
import { AddAudioButton } from './AddAudioButton'
import { AudioButton } from '../../AudioButton'
import { AudiosWrapper } from './AudiosWrapper'

const buildUpdateAudio = ({ audios, audioIndex, changeAudios }) => (
  payload
) => {
  const newAudios = [...audios]
  newAudios[audioIndex] = {
    ...audios[audioIndex],
    ...payload,
  }
  changeAudios(newAudios)
}

const buildDeleteAudio = ({ audios, audioIndex, changeAudios }) => () => {
  const newAudios = [...audios]
  newAudios.splice(audioIndex, 1)
  changeAudios(newAudios)
}

const buildChangeName = ({ audios, audioIndex, changeAudios }) => (name) => {
  const newAudios = [...audios]
  newAudios[audioIndex] = {
    ...newAudios[audioIndex],
    name,
  }
  changeAudios(newAudios)
}

export const Audios = ({ audios, changeAudios, audioFilePrefix }) => {
  const addAudio = () =>
    changeAudios([...audios, { url: '', name: 'new name' }])

  return (
    <>
      {audios &&
        audios.map(({ name, url }, audioIndex) => (
          <AudiosWrapper key={audioIndex}>
            <Audio
              url={url}
              audioFilePrefix={audioFilePrefix}
              index={audioIndex}
              updateAudio={buildUpdateAudio({
                audios,
                audioIndex,
                changeAudios,
              })}
              deleteAudio={buildDeleteAudio({
                audios,
                audioIndex,
                changeAudios,
              })}
              changeName={buildChangeName({ audios, audioIndex, changeAudios })}
              name={name}
              key={url}
            />
            <AudioButton
              audioUrls={[
                `https://alfabetiza.s3-sa-east-1.amazonaws.com/${url}`,
              ]}
              size={'20'}
            />
          </AudiosWrapper>
        ))}
      <AddAudioButton onClick={addAudio} />
    </>
  )
}

Audios.propTypes = {
  audioFilePrefix: PropTypes.string,
  audios: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  changeAudios: PropTypes.func,
}
