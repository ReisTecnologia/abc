import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Uploader } from './Uploader'
import { InputWrapper } from './InputWrapper'
import { AudioWrapper } from './AudioWrapper'
import { AudioNameWrapper } from './AudioNameWrapper'
import { AudioButtonWrapper } from './AudioButtonWrapper'
import { AudioFieldsWrapper } from './AudioFieldsWrapper'
import { NameAndUrlWrapper } from './NameAndUrlWrapper'
import { DeleteAudioButton } from './DeleteAudioButton'
import { TextAndInput } from '../../TextAndInput'
import { AudioButton } from 'shared/AudioButton'
import { UploadButton } from '../../UploadButton'
import { colors } from 'shared/colors'

export const Audio = ({
  audioFilePrefix,
  name,
  url,
  updateAudio,
  deleteAudio,
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
  console.log('url', url)

  return (
    <AudioWrapper>
      <AudioButtonWrapper>
        <AudioButton
          audioUrls={[`https://alfabetiza.s3-sa-east-1.amazonaws.com/${url}`]}
          size={'25'}
        />
        <UploadButton onClick={toggleFileInput} color={colors.grayText} />
      </AudioButtonWrapper>
      <AudioFieldsWrapper>
        <NameAndUrlWrapper>
          <AudioNameWrapper>
            <TextAndInput value={name} onChange={changeName} />
          </AudioNameWrapper>
        </NameAndUrlWrapper>
        {extraFields}
      </AudioFieldsWrapper>
      <DeleteAudioButton deleteAudio={deleteAudio} />
    </AudioWrapper>
  )
}

Audio.propTypes = {
  audioFilePrefix: PropTypes.string,
  name: PropTypes.string,
  updateAudio: PropTypes.func,
  deleteAudio: PropTypes.func,
  url: PropTypes.string,
  changeName: PropTypes.func,
}
