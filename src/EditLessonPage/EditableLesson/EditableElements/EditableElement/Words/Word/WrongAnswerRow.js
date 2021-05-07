import React, { useState } from 'react'
import { DragAndDrop } from '_shared/DragAndDrop'
import { FileUploader } from '_shared/FileUploader'
import { Spinner } from '_shared/Spinner'
import { FileDownloader } from '../../FileDownloader'
import { TextInput } from '../../TextInput'
import { WordWrongAnswerWrapper, WordAnswerInfoWrapper } from './Word.styles'
import { colors } from '_shared/colors'
import PropTypes from 'prop-types'

export const WrongAnswerRow = ({
  audioFilePrefix,
  updateAudio,
  urlWrongAnswerExplanation,
  audioButtonField,
  wrongAnswerExplanation,
  changeWrongAnswerExplanation,
}) => {
  const [wrongAnswerLoading, setWrongAnswerLoading] = useState(false)

  return (
    <WordWrongAnswerWrapper>
      {wrongAnswerLoading ? (
        <Spinner />
      ) : (
        <DragAndDrop
          audioFilePrefix={audioFilePrefix}
          updateWrongAnswerAudio={updateAudio}
        >
          {audioButtonField(urlWrongAnswerExplanation)}
          <FileUploader
            color={colors.grayText}
            audioFilePrefix={audioFilePrefix}
            updateWrongAnswerAudio={updateAudio}
            loading={wrongAnswerLoading}
            setLoading={setWrongAnswerLoading}
          />
          <FileDownloader
            color={colors.grayText}
            filename={urlWrongAnswerExplanation}
          />
          <WordAnswerInfoWrapper>
            Errou?
            <TextInput
              value={wrongAnswerExplanation}
              onChange={changeWrongAnswerExplanation}
              color={colors.grayText}
              width={'100%'}
            />
          </WordAnswerInfoWrapper>
        </DragAndDrop>
      )}
    </WordWrongAnswerWrapper>
  )
}

WrongAnswerRow.propTypes = {
  audioFilePrefix: PropTypes.string,
  updateAudio: PropTypes.func,
  urlWrongAnswerExplanation: PropTypes.string,
  audioButtonField: PropTypes.func,
  wrongAnswerExplanation: PropTypes.string,
  changeWrongAnswerExplanation: PropTypes.func,
}
