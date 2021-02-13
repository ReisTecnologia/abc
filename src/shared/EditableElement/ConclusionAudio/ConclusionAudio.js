import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from './TextInput'
import { Uploader } from './Uploader'
import { DeleteConclusionAudioButton } from './DeleteConclusionAudioButton'
import { InputWrapper } from './InputWrapper'
import { AddConclusionAudioButton } from './AddConclusionAudioButton'
import { ConclusionAudioNameWrapper } from './ConclusionAudioNameWrapper'
import { ConclusionAudioWrapper } from './ConclusionAudioWrapper'
import { ConclusionAudioFieldsWrapper } from './ConclusionAudioFieldsWrapper'
import { OptionalTextWrapper } from './OptionalTextWrapper'
import { useOnClickOutside } from '../../useOnClickOutside'

const buildUpdateAudio = ({ conclusionAudio, changeConclusionAudio }) => (
  payload
) => {
  const newConclusionAudio = {
    ...conclusionAudio,
    ...payload,
  }
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
  const [showFileUploadInput, setShowFileUploadInput] = useState(false)
  const showInput = () => setShowFileUploadInput(true)
  const hideInput = () => setShowFileUploadInput(false)
  const toggleInputFields = () =>
    showFileUploadInput ? hideInput() : showInput()
  const buildDeleteAudio = ({ changeConclusionAudio }) => () => {
    const newConclusionAudio = {}
    changeConclusionAudio(newConclusionAudio)
    hideInput()
  }

  const hideInputOnClickOutside = useCallback(() => {
    setShowFileUploadInput(false)
  }, [setShowFileUploadInput])

  const ref = useOnClickOutside(hideInputOnClickOutside)

  return (
    <ConclusionAudioWrapper>
      <OptionalTextWrapper>(Opcional)</OptionalTextWrapper>
      {!showFileUploadInput && (
        <>
          <ConclusionAudioNameWrapper onClick={toggleInputFields}>
            {conclusionAudio.name}
          </ConclusionAudioNameWrapper>
          <AddConclusionAudioButton onClick={toggleInputFields} />
        </>
      )}
      {showFileUploadInput && (
        <ConclusionAudioFieldsWrapper ref={ref}>
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
