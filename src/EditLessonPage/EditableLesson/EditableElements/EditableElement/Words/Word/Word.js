import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useOnClickOutside } from '_shared/useOnClickOutside'
import { DeleteWordButton } from './DeleteWordButton'
import { TextInput } from './TextInput'
import { WordFieldsWrapper } from './WordFieldsWrapper'
import { WordWrapper } from './WordWrapper'
import { Spinner } from '_shared/Spinner'
import { StartsWithTheLetterInputField } from './StartsWithTheLetterInputField'
import { AnswerButtonsWrapper } from './AnswerButtonsWrapper'
import { WordAndAnswerWrapper } from './WordAndAnswerWrapper'
import { WordAnswerInfoWrapper } from './WordAnswerInfoWrapper'
import { WordWrongAnswerWrapper } from './WordWrongAnswerWrapper'
import { WordRightAnswerWrapper } from './WordRightAnswerWrapper'
import {
  AudioButtonWrapper,
  AudioButtonMobileWrapper,
} from '../../AudioButtonWrappers'
import { FileUploader } from '_shared/FileUploader'
import { AudioButton } from '_shared/AudioButton'
import { DragAndDrop } from '_shared/DragAndDrop'
import { colors } from '_shared/colors'
import { FileDownloader } from '../../FileDownloader'

export const Word = ({
  audioFilePrefix,
  word,
  rightAnswerExplanation,
  wrongAnswerExplanation,
  updateAudio,
  deleteWord,
  urlWord,
  urlRightAnswerExplanation,
  urlWrongAnswerExplanation,
  changeName,
  startsWithTheLetter,
  changeRightAnswerExplanation,
  changeWrongAnswerExplanation,
}) => {
  const [showRadioButtons, setShowRadioButtons] = useState(false)
  const [wordLoading, setWordLoading] = useState(false)
  const [rightAnswerLoading, setRightAnswerLoading] = useState(false)
  const [wrongAnswerLoading, setWrongAnswerLoading] = useState(false)

  const showButtons = () => setShowRadioButtons(true)
  const hideButtons = () => setShowRadioButtons(false)

  const toggleButtons = () => (showRadioButtons ? hideButtons() : showButtons())

  const hideOnClickOutside = useCallback(() => {
    setShowRadioButtons(false)
  }, [setShowRadioButtons])

  const AudioButtonField = (url) => (
    <>
      <AudioButtonWrapper>
        <AudioButton
          audioUrls={[
            `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${url}`,
          ]}
          size={20}
          color={colors.grayText}
        />
      </AudioButtonWrapper>
      <AudioButtonMobileWrapper>
        <AudioButton
          audioUrls={[
            `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${url}`,
          ]}
          size={17}
          color={colors.grayText}
        />
      </AudioButtonMobileWrapper>
    </>
  )

  const ref = useOnClickOutside(hideOnClickOutside)

  const resposta = startsWithTheLetter ? 'Certo' : 'Errado'

  return (
    <WordWrapper>
      <WordFieldsWrapper>
        <WordAndAnswerWrapper ref={ref}>
          {wordLoading ? (
            <Spinner />
          ) : (
            <DragAndDrop
              audioFilePrefix={audioFilePrefix}
              updateWordAudio={updateAudio}
            >
              {AudioButtonField(urlWord)}
              <FileUploader
                color={colors.grayText}
                audioFilePrefix={audioFilePrefix}
                updateWordAudio={updateAudio}
                loading={wordLoading}
                setLoading={setWordLoading}
              />
              <FileDownloader color={colors.grayText} filename={urlWord} />
              <TextInput
                value={word}
                onChange={changeName}
                color={colors.dimmedPrimary}
                width={'20%'}
              />
              <AnswerButtonsWrapper onClick={toggleButtons}>
                {showRadioButtons ? (
                  <StartsWithTheLetterInputField
                    word={word}
                    updateAudio={updateAudio}
                    startsWithTheLetter={startsWithTheLetter}
                  />
                ) : (
                  resposta
                )}
              </AnswerButtonsWrapper>
            </DragAndDrop>
          )}
        </WordAndAnswerWrapper>
        <WordRightAnswerWrapper>
          {rightAnswerLoading ? (
            <Spinner />
          ) : (
            <DragAndDrop
              audioFilePrefix={audioFilePrefix}
              updateRightAnswerAudio={updateAudio}
            >
              {AudioButtonField(urlRightAnswerExplanation)}
              <FileUploader
                color={colors.grayText}
                audioFilePrefix={audioFilePrefix}
                updateRightAnswerAudio={updateAudio}
                loading={rightAnswerLoading}
                setLoading={setRightAnswerLoading}
              />
              <FileDownloader
                color={colors.grayText}
                filename={urlRightAnswerExplanation}
              />
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
        <WordWrongAnswerWrapper>
          {wrongAnswerLoading ? (
            <Spinner />
          ) : (
            <DragAndDrop
              audioFilePrefix={audioFilePrefix}
              updateWrongAnswerAudio={updateAudio}
            >
              {AudioButtonField(urlWrongAnswerExplanation)}
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
      </WordFieldsWrapper>
      <DeleteWordButton deleteWord={deleteWord} />
    </WordWrapper>
  )
}

Word.propTypes = {
  audioFilePrefix: PropTypes.string,
  word: PropTypes.string,
  urlWord: PropTypes.string,
  urlRightAnswerExplanation: PropTypes.string,
  urlWrongAnswerExplanation: PropTypes.string,
  startsWithTheLetter: PropTypes.bool,
  rightAnswerExplanation: PropTypes.string,
  wrongAnswerExplanation: PropTypes.string,
  updateAudio: PropTypes.func,
  deleteWord: PropTypes.func,
  index: PropTypes.number,
  changeName: PropTypes.func,
  changeRightAnswerExplanation: PropTypes.func,
  changeWrongAnswerExplanation: PropTypes.func,
}
