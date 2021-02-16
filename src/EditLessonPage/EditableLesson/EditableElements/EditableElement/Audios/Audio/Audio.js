import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Uploader } from './Uploader'
import { InputWrapper } from './InputWrapper'
import { AudioWrapper } from './AudioWrapper'
import { AudioNameWrapper } from './AudioNameWrapper'
import { AudioNumberWrapper } from './AudioNumberWrapper'
import { AudioNumber } from './AudioNumber'
import { AudioFieldsWrapper } from './AudioFieldsWrapper'
import { NameAndUrlWrapper } from './NameAndUrlWrapper'
import { DeleteAudioButton } from './DeleteAudioButton'
import { TextAndInput } from '../../TextAndInput'

export const Audio = ({
  audioFilePrefix,
  name,
  updateAudio,
  deleteAudio,
  index,
  changeName,
}) => {
  const [showFileUploadInput, setShowFileUploadInput] = useState(false)
  const showInput = () => setShowFileUploadInput(true)
  const hideInput = () => setShowFileUploadInput(false)
  const toggleFileInput = () =>
    showFileUploadInput ? hideInput() : showInput()
  const extraFields = showFileUploadInput && (
    <>
      <InputWrapper>
        <Uploader audioFilePrefix={audioFilePrefix} updateAudio={updateAudio} />
      </InputWrapper>
      <DeleteAudioButton deleteAudio={deleteAudio} />
    </>
  )

  return (
    <AudioWrapper>
      <AudioNumberWrapper onClick={toggleFileInput}>
        <AudioNumber>{index + 1}</AudioNumber>
      </AudioNumberWrapper>
      <AudioFieldsWrapper>
        <NameAndUrlWrapper>
          <AudioNameWrapper>
            <TextAndInput value={name} onChange={changeName} />
          </AudioNameWrapper>
        </NameAndUrlWrapper>
        {extraFields}
      </AudioFieldsWrapper>
    </AudioWrapper>
  )
}

Audio.propTypes = {
  audioFilePrefix: PropTypes.string,
  name: PropTypes.string,
  updateAudio: PropTypes.func,
  deleteAudio: PropTypes.func,
  index: PropTypes.number,
  changeName: PropTypes.func,
}
