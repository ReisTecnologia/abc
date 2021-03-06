import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextAndInput } from 'shared/TextAndInput'
import { DeleteConclusionAudioButton } from './DeleteConclusionAudioButton'
import { AudioButton } from 'shared/AudioButton'
import { FileUploader } from '../FileUploader'
import { ConclusionAudioNameWrapper } from './ConclusionAudioNameWrapper'
import { ConclusionAudioWrapper } from './ConclusionAudioWrapper'
import { OptionalTextWrapper } from './OptionalTextWrapper'
import { ConclusionAudioButtonsWrapper } from './ConclusionAudioButtonsWrapper'
import { colors } from 'shared/colors'
import { DragAndDrop } from '../DragAndDrop'
import { Spinner } from 'shared/Spinner'

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
  const buildDeleteAudio = ({ changeConclusionAudio }) => () => {
    const newConclusionAudio = {}
    changeConclusionAudio(newConclusionAudio)
  }
  const [loading, setLoading] = useState(false)

  return (
    <ConclusionAudioWrapper>
      <OptionalTextWrapper>(Opcional)</OptionalTextWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <ConclusionAudioButtonsWrapper>
          <DragAndDrop
            audioFilePrefix={audioFilePrefix}
            updateAudio={buildUpdateAudio({
              conclusionAudio,
              changeConclusionAudio,
            })}
          >
            <AudioButton
              audioUrls={[
                `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${conclusionAudio.url}`,
              ]}
              size={20}
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
      )}
    </ConclusionAudioWrapper>
  )
}

ConclusionAudio.propTypes = {
  audioFilePrefix: PropTypes.string,
  conclusionAudio: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),

  changeConclusionAudio: PropTypes.func,
}
