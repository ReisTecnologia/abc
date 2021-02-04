import React from 'react'
import PropTypes from 'prop-types'
import { Audio } from './Audio/Audio'
import { AddAudioButton } from './AddAudioButton'

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

export const Audios = ({ audios, changeAudios }) => {
  const addAudio = () =>
    changeAudios([...audios, { url: '', name: 'new name' }])

  return (
    <>
      {audios &&
        audios.map(({ name, url }, audioIndex) => (
          <Audio
            url={url}
            index={audioIndex}
            updateAudio={buildUpdateAudio({ audios, audioIndex, changeAudios })}
            deleteAudio={buildDeleteAudio({ audios, audioIndex, changeAudios })}
            changeName={buildChangeName({ audios, audioIndex, changeAudios })}
            name={name}
            key={url}
          />
        ))}
      <AddAudioButton onClick={addAudio} />
    </>
  )
}

Audios.propTypes = {
  audios: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  changeAudios: PropTypes.func,
}
