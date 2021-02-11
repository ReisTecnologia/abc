import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from './TextInput'
import { Uploader } from './Uploader'
import { DeleteConclusionAudioButton } from './DeleteConclusionAudioButton'
import { InputWrapper } from './InputWrapper'
import { AddConclusionAudioButton } from './AddConclusionAudioButton'
import { ConclusionAudioNameWrapper } from './ConclusionAudioNameWrapper'
import { ConclusionAudioNumber } from './ConclusionAudioNumber'
import { NumberWrapper } from './NumberWrapper'
import { ConclusionAudioWrapper } from './ConclusionAudioWrapper'
import { ConclusionAudioFieldsWrapper } from './ConclusionAudioFieldsWrapper'

const buildUpdateAudio = ({ conclusionAudio, changeConclusionAudio }) => (
  payload
) => {
  const newConclusionAudio = {
    ...conclusionAudio,
    ...payload,
  }
  changeConclusionAudio(newConclusionAudio)
}

const buildDeleteAudio = ({ changeConclusionAudio }) => () => {
  const newConclusionAudio = {}
  changeConclusionAudio(newConclusionAudio)
}

const buildChangeName = ({ conclusionAudio, changeConclusionAudio }) => (
  name
) => {
  const newConclusionAudio = {
    ...conclusionAudio,
    name,
  }
  changeConclusionAudio(newConclusionAudio)
}

export const ConclusionAudio = ({
  conclusionAudio,
  changeConclusionAudio,
  audioFilePrefix,
}) => {
  const addAudio = () =>
    changeConclusionAudio({
      url: '',
      name: 'Áudio de conclusão',
    })

  const [showFileUploadInput, setShowFileUploadInput] = useState(false)
  const showInput = () => setShowFileUploadInput(true)
  const hideInput = () => setShowFileUploadInput(false)
  const toggleInputFields = () =>
    showFileUploadInput ? hideInput() : showInput()

  return (
    <ConclusionAudioWrapper>
      <NumberWrapper onClick={toggleInputFields}>
        <ConclusionAudioNumber>1</ConclusionAudioNumber>
      </NumberWrapper>
      {!showFileUploadInput && (
        <ConclusionAudioNameWrapper>
          {conclusionAudio.name}
        </ConclusionAudioNameWrapper>
      )}
      {showFileUploadInput && (
        <ConclusionAudioFieldsWrapper>
          <TextInput
            value={conclusionAudio.name}
            onChange={buildChangeName({
              conclusionAudio,
              changeConclusionAudio,
            })}
          />
          <InputWrapper>
            <Uploader
              audioFilePrefix={audioFilePrefix}
              updateAudio={buildUpdateAudio({
                conclusionAudio,
                changeConclusionAudio,
              })}
            />
          </InputWrapper>
          <DeleteConclusionAudioButton
            deleteAudio={buildDeleteAudio({ changeConclusionAudio })}
          />
        </ConclusionAudioFieldsWrapper>
      )}
      {!conclusionAudio && <AddConclusionAudioButton onClick={addAudio} />}
    </ConclusionAudioWrapper>
  )
}

ConclusionAudio.propTypes = {
  audioFilePrefix: PropTypes.string,
  conclusionAudio: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  changeConclusionAudio: PropTypes.func,
}
