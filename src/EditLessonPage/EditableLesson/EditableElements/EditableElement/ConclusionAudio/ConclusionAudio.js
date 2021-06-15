import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { TextAndInput } from '_shared/TextAndInput'
import { DeleteConclusionAudioButton } from './DeleteConclusionAudioButton'
import { AudioButton } from '_shared/AudioButton'
import { FileUploader } from '_shared/FileUploader'
import { ConclusionAudioNameWrapper } from './ConclusionAudioNameWrapper'
import { ConclusionAudioWrapper } from './ConclusionAudioWrapper'
import { OptionalTextWrapper } from './OptionalTextWrapper'
import { ConclusionAudioButtonsWrapper } from './ConclusionAudioButtonsWrapper'
import { AddConclusionAudioButton } from './AddConclusionAudioButton'
import {
  AudioButtonWrapper,
  AudioButtonMobileWrapper,
} from '../AudioButtonWrappers'
import { colors } from '_shared/colors'
import { DragAndDrop } from '_shared/DragAndDrop'
import { Spinner } from '_shared/Spinner'
import { FileDownloader } from '../FileDownloader'

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
  const checkUrl = conclusionAudio.url && conclusionAudio.url !== ''
  const [showConclusionAudio, setShowConclusionAudio] = useState(false)
  const buildDeleteAudio = ({ changeConclusionAudio }) => () => {
    const newConclusionAudio = {}
    changeConclusionAudio(newConclusionAudio)
  }
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!conclusionAudio.name && !conclusionAudio.url)
      setShowConclusionAudio(false)
    else setShowConclusionAudio(true)
  }, [conclusionAudio, setShowConclusionAudio])

  const addConclusionAudio = () => setShowConclusionAudio(true)
  const AudioButtonBuilder = (size) => (
    <>
      <AudioButton
        audioUrls={[
          `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${conclusionAudio.url}`,
        ]}
        size={size}
        color={colors.grayText}
      />
      <FileUploader
        color={colors.grayText}
        audioFilePrefix={audioFilePrefix}
        updateAudio={buildUpdateAudio({
          conclusionAudio,
          changeConclusionAudio,
        })}
        loading={loading}
        setLoading={setLoading}
      />
      {checkUrl && (
        <FileDownloader
          color={colors.grayText}
          filename={conclusionAudio.url}
        />
      )}
    </>
  )

  return (
    <ConclusionAudioWrapper>
      <OptionalTextWrapper>(Opcional)</OptionalTextWrapper>
      {loading ? (
        <Spinner />
      ) : showConclusionAudio ? (
        <ConclusionAudioButtonsWrapper>
          <DragAndDrop
            audioFilePrefix={audioFilePrefix}
            updateAudio={buildUpdateAudio({
              conclusionAudio,
              changeConclusionAudio,
            })}
          >
            <AudioButtonWrapper>{AudioButtonBuilder(20)}</AudioButtonWrapper>
            <AudioButtonMobileWrapper>
              {AudioButtonBuilder(17)}
            </AudioButtonMobileWrapper>

            <ConclusionAudioNameWrapper>
              <TextAndInput
                value={conclusionAudio.name}
                onChange={buildChangeName({
                  conclusionAudio,
                  changeConclusionAudio,
                })}
                color={colors.dimmedPrimary}
              />
            </ConclusionAudioNameWrapper>
            <DeleteConclusionAudioButton
              deleteAudio={buildDeleteAudio({ changeConclusionAudio })}
            />
          </DragAndDrop>
        </ConclusionAudioButtonsWrapper>
      ) : (
        <AddConclusionAudioButton onClick={addConclusionAudio} />
      )}
    </ConclusionAudioWrapper>
  )
}

ConclusionAudio.propTypes = {
  audioFilePrefix: PropTypes.string,
  conclusionAudio: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
  }),

  changeConclusionAudio: PropTypes.func,
}
