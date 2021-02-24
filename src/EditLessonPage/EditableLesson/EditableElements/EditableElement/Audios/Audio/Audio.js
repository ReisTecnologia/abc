import React from 'react'
import PropTypes from 'prop-types'
import { AudioWrapper } from './AudioWrapper'
import { AudioNameWrapper } from './AudioNameWrapper'
import { AudioButtonWrapper } from './AudioButtonWrapper'
import { AudioFieldsWrapper } from './AudioFieldsWrapper'
import { NameAndUrlWrapper } from './NameAndUrlWrapper'
import { DeleteAudioButton } from './DeleteAudioButton'
import { TextAndInput } from '../../TextAndInput'
import { AudioButton } from 'shared/AudioButton'
import { FileUploader } from '../../FileUploader'
import { DragAndDrop } from '../../DragAndDrop'
import { colors } from 'shared/colors'

export const Audio = ({
  audioFilePrefix,
  name,
  url,
  updateAudio,
  deleteAudio,
  changeName,
}) => {
  return (
    <AudioWrapper>
      <DragAndDrop audioFilePrefix={audioFilePrefix} updateAudio={updateAudio}>
        <AudioButtonWrapper>
          <AudioButton
            audioUrls={[
              `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${url}`,
            ]}
            size={25}
            color={colors.grayText}
          />
          <FileUploader
            color={colors.grayText}
            audioFilePrefix={audioFilePrefix}
            updateAudio={updateAudio}
          />
        </AudioButtonWrapper>
        <AudioFieldsWrapper>
          <NameAndUrlWrapper>
            <AudioNameWrapper>
              <TextAndInput value={name} onChange={changeName} />
            </AudioNameWrapper>
          </NameAndUrlWrapper>
        </AudioFieldsWrapper>
      </DragAndDrop>
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
