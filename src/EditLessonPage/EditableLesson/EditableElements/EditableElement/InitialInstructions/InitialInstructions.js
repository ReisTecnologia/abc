import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextAndInput } from '_shared/TextAndInput'
import { DeleteInitialAudioButton } from './DeleteInitialAudioButton'
import { AudioButton } from '_shared/AudioButton'
import { FileUploader } from '_shared/FileUploader'
import {
  InitialAudioButtonsWrapper,
  InitialAudioNameWrapper,
  InitialAudioWrapper,
} from './InitialInstructions.styles'
import { AddInitialAudioButton } from './AddInitialAudioButton'
import {
  AudioButtonWrapper,
  AudioButtonMobileWrapper,
} from '../AudioButtonWrappers'
import { colors } from '_shared/colors'
import { DragAndDrop } from '_shared/DragAndDrop'
import { Spinner } from '_shared/Spinner'
import { FileDownloader } from '../FileDownloader'

const buildUpdateAudio = ({ initialAudio, changeInitialAudio }) => (
  payload
) => {
  const newInitialAudio = {
    ...initialAudio,
    ...payload,
  }
  changeInitialAudio(newInitialAudio)
}

const buildChangeName = ({ initialAudio, changeInitialAudio }) => (name) => {
  const newInitialAudio = {
    ...initialAudio,
    name,
  }
  changeInitialAudio(newInitialAudio)
}

export const InitialInstructions = ({
  initialAudio,
  changeInitialAudio,
  audioFilePrefix,
}) => {
  const checkUrl = initialAudio.url && initialAudio.url !== ''
  const [showInitialAudio, setShowInitialAudio] = useState(false)

  useEffect(() => {
    if (!initialAudio.name && !initialAudio.url) setShowInitialAudio(false)
    else setShowInitialAudio(true)
  }, [initialAudio, setShowInitialAudio])

  const addInitialnAudio = () => setShowInitialAudio(true)

  const buildDeleteAudio = ({ changeInitialAudio }) => () => {
    const newInitialAudio = {}
    changeInitialAudio(newInitialAudio)
  }
  const [loading, setLoading] = useState(false)

  const AudioButtonBuilder = (size) => (
    <AudioButton
      audioUrls={[
        `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${initialAudio.url}`,
      ]}
      size={size}
      color={colors.grayText}
    />
  )

  return (
    <InitialAudioWrapper>
      {loading ? (
        <Spinner />
      ) : showInitialAudio ? (
        <InitialAudioButtonsWrapper>
          <DragAndDrop
            audioFilePrefix={audioFilePrefix}
            updateAudio={buildUpdateAudio({
              initialAudio,
              changeInitialAudio,
            })}
          >
            <AudioButtonWrapper>{AudioButtonBuilder(20)}</AudioButtonWrapper>
            <AudioButtonMobileWrapper>
              {AudioButtonBuilder(17)}
            </AudioButtonMobileWrapper>
            <FileUploader
              color={colors.grayText}
              audioFilePrefix={audioFilePrefix}
              updateAudio={buildUpdateAudio({
                initialAudio,
                changeInitialAudio,
              })}
              loading={loading}
              setLoading={setLoading}
            />
            {checkUrl && (
              <FileDownloader
                color={colors.grayText}
                filename={initialAudio.url}
              />
            )}
            <InitialAudioNameWrapper>
              <TextAndInput
                value={initialAudio.name}
                onChange={buildChangeName({
                  initialAudio,
                  changeInitialAudio,
                })}
                color={colors.dimmedPrimary}
              />
            </InitialAudioNameWrapper>
            <DeleteInitialAudioButton
              deleteAudio={buildDeleteAudio({ changeInitialAudio })}
            />
          </DragAndDrop>
        </InitialAudioButtonsWrapper>
      ) : (
        <AddInitialAudioButton onClick={addInitialnAudio} />
      )}
    </InitialAudioWrapper>
  )
}

InitialInstructions.propTypes = {
  audioFilePrefix: PropTypes.string,
  initialAudio: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),

  changeInitialAudio: PropTypes.func,
}
