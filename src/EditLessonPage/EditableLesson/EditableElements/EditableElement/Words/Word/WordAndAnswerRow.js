import React, { useState, useCallback } from 'react'
import { useOnClickOutside } from '_shared/useOnClickOutside'
import PropTypes from 'prop-types'
import { WordAndAnswerWrapper, AnswerButtonsWrapper } from './Word.styles'
import { StartsWithTheLetterInputField } from './StartsWithTheLetterInputField'
import { DragAndDrop } from '_shared/DragAndDrop'
import { FileUploader } from '_shared/FileUploader'
import { TextInput } from '../../TextInput'
import { FileDownloader } from '../../FileDownloader'
import { Spinner } from '_shared/Spinner'
import { colors } from '_shared/colors'

export const WordAndAnswerRow = ({
  audioFilePrefix,
  updateAudio,
  urlWord,
  changeName,
  word,
  startsWithTheLetter,
  audioButtonField,
}) => {
  const [wordLoading, setWordLoading] = useState(false)

  const resposta = startsWithTheLetter ? 'Certo' : 'Errado'
  const [showRadioButtons, setShowRadioButtons] = useState(false)

  const showButtons = () => setShowRadioButtons(true)
  const hideButtons = () => setShowRadioButtons(false)
  const toggleButtons = () => (showRadioButtons ? hideButtons() : showButtons())

  const hideOnClickOutside = useCallback(() => {
    setShowRadioButtons(false)
  }, [setShowRadioButtons])
  const ref = useOnClickOutside(hideOnClickOutside)

  return (
    <WordAndAnswerWrapper ref={ref}>
      {wordLoading ? (
        <Spinner />
      ) : (
        <DragAndDrop
          audioFilePrefix={audioFilePrefix}
          updateWordAudio={updateAudio}
        >
          {audioButtonField(urlWord)}
          <FileUploader
            color={colors.grayText}
            audioFilePrefix={audioFilePrefix}
            updateWordAudio={updateAudio}
            loading={wordLoading}
            setLoading={setWordLoading}
          />
          {urlWord !== '' && (
            <FileDownloader color={colors.grayText} filename={urlWord} />
          )}
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
  )
}

WordAndAnswerRow.propTypes = {
  audioFilePrefix: PropTypes.string,
  updateAudio: PropTypes.func,
  urlWord: PropTypes.string,
  changeName: PropTypes.func,
  word: PropTypes.string,
  startsWithTheLetter: PropTypes.bool,
  audioButtonField: PropTypes.func,
}
