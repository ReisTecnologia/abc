import React, { useState } from 'react'
import { DragAndDrop } from '_shared/DragAndDrop'
import { FileUploader } from '_shared/FileUploader'
import { Spinner } from '_shared/Spinner'
import { FileDownloader } from '../../FileDownloader'
import { TextInput } from './TextInput'
import { WordRightAnswerWrapper, WordAnswerInfoWrapper } from './Word.styles'
import { colors } from '_shared/colors'
import PropTypes from 'prop-types'

export const RightAnswerRow = ({
  audioFilePrefix,
  updateAudio,
  audioButtonField,
  urlRightAnswerExplanation,
  rightAnswerExplanation,
  changeRightAnswerExplanation,
}) => {
  const [rightAnswerLoading, setRightAnswerLoading] = useState(false)

  return (
    <WordRightAnswerWrapper>
      {rightAnswerLoading ? (
        <Spinner />
      ) : (
        <DragAndDrop
          audioFilePrefix={audioFilePrefix}
          updateRightAnswerAudio={updateAudio}
        >
          {audioButtonField(urlRightAnswerExplanation)}
          <FileUploader
            color={colors.grayText}
            audioFilePrefix={audioFilePrefix}
            updateRightAnswerAudio={updateAudio}
            loading={rightAnswerLoading}
            setLoading={setRightAnswerLoading}
          />
          {urlRightAnswerExplanation !== '' && (
            <FileDownloader
              color={colors.grayText}
              filename={urlRightAnswerExplanation}
            />
          )}
          <WordAnswerInfoWrapper>
            Acertou?
            <TextInput
              value={rightAnswerExplanation}
              onChange={changeRightAnswerExplanation}
              color={colors.grayText}
              width={'100%'}
            />
          </WordAnswerInfoWrapper>
        </DragAndDrop>
      )}
    </WordRightAnswerWrapper>
  )
}

RightAnswerRow.propTypes = {
  audioFilePrefix: PropTypes.string,
  updateAudio: PropTypes.func,
  audioButtonField: PropTypes.func,
  urlRightAnswerExplanation: PropTypes.string,
  rightAnswerExplanation: PropTypes.string,
  changeRightAnswerExplanation: PropTypes.func,
}
