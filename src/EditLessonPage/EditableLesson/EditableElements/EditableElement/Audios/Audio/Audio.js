import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '_shared/Spinner'
import { AudioWrapper } from './AudioWrapper'
import { AudioNameWrapper } from './AudioNameWrapper'
import {
  AudioButtonWrapper,
  AudioButtonMobileWrapper,
} from './AudioButtonWrapper'
import { AudioFieldsWrapper } from './AudioFieldsWrapper'
import { NameAndUrlWrapper } from './NameAndUrlWrapper'
import { DeleteAudioButton } from './DeleteAudioButton'
import { TextAndInput } from '_shared/TextAndInput'
import { AudioButton } from '_shared/AudioButton'
import { FileUploader } from '_shared/FileUploader'
import { DragAndDrop } from '_shared/DragAndDrop'
import { colors } from '_shared/colors'
import { FileDownloader } from '../../FileDownloader'

export const Audio = ({
  audioFilePrefix,
  name,
  url,
  updateAudio,
  deleteAudio,
  changeName,
}) => {
  const [loading, setLoading] = useState(false)
  const AudioButtonsBuilder = (size) => (
    <>
      <AudioButton
        audioUrls={[
          `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${url}`,
        ]}
        size={size}
        color={colors.grayText}
      />
      <FileUploader
        color={colors.grayText}
        loading={loading}
        setLoading={setLoading}
        audioFilePrefix={audioFilePrefix}
        updateAudio={updateAudio}
      />
      {url !== '' && <FileDownloader color={colors.grayText} filename={url} />}
    </>
  )
  return (
    <AudioWrapper>
      <DragAndDrop audioFilePrefix={audioFilePrefix} updateAudio={updateAudio}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <AudioButtonWrapper>{AudioButtonsBuilder(20)}</AudioButtonWrapper>
            <AudioButtonMobileWrapper>
              {AudioButtonsBuilder(17)}
            </AudioButtonMobileWrapper>
            <AudioFieldsWrapper>
              <NameAndUrlWrapper>
                <AudioNameWrapper>
                  <TextAndInput
                    value={name}
                    onChange={changeName}
                    color={colors.dimmedPrimary}
                  />
                </AudioNameWrapper>
              </NameAndUrlWrapper>
            </AudioFieldsWrapper>
            <DeleteAudioButton deleteAudio={deleteAudio} />
          </>
        )}
      </DragAndDrop>
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
