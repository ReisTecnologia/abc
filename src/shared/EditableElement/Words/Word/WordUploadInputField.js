import React from 'react'
import { Uploader } from './Uploader'
import { InputWrapper } from './InputWrapper'
import PropTypes from 'prop-types'

export const WordUploadInputField = ({
  updateWordAudio,
  updateCorrectAnswerAudio,
  updateWrongAnswerAudio,
  inputBoxMessage,
  audioFilePrefix,
}) => {
  return (
    <>
      <InputWrapper>
        <Uploader
          audioFilePrefix={audioFilePrefix}
          updateWordAudio={updateWordAudio}
          updateCorrectAnswerAudio={updateCorrectAnswerAudio}
          updateWrongAnswerAudio={updateWrongAnswerAudio}
          inputBoxMessage={inputBoxMessage}
        />
      </InputWrapper>
    </>
  )
}
WordUploadInputField.propTypes = {
  audioFilePrefix: PropTypes.string,
  inputBoxMessage: PropTypes.string,
  updateWordAudio: PropTypes.func,
  updateCorrectAnswerAudio: PropTypes.func,
  updateWrongAnswerAudio: PropTypes.func,
}
