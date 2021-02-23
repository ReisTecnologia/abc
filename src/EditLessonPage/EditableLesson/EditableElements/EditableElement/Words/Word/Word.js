import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DeleteWordButton } from './DeleteWordButton'
import { TextInput } from './TextInput'
import { WordFieldsWrapper } from './WordFieldsWrapper'
import { WordWrapper } from './WordWrapper'
import { StartsWithTheLetterInputField } from './StartsWithTheLetterInputField'
import { WordSubFieldWrapper } from './WordSubFieldWrapper'
import { WordAndAnswerWrapper } from './WordAndAnswerWrapper'
import { WordAnswerInfoWrapper } from './WordAnswerInfoWrapper'
import { WordWrongAnswerWrapper } from './WordWrongAnswerWrapper'
import { WordRightAnswerWrapper } from './WordRightAnswerWrapper'
import { UploadButton } from '../../UploadButton'
import { AudioButton } from 'shared/AudioButton'
import { DragAndDrop } from '../../DragAndDrop'
import { colors } from 'shared/colors'

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

  const showButtons = () => setShowRadioButtons(true)
  const hideButtons = () => setShowRadioButtons(false)

  const toggleButtons = () => (showRadioButtons ? hideButtons() : showButtons())

  const resposta = startsWithTheLetter ? 'Certo' : 'Errado'

  return (
    <WordWrapper>
      <WordFieldsWrapper>
        <WordAndAnswerWrapper>
          <DragAndDrop
            audioFilePrefix={audioFilePrefix}
            updateWordAudio={updateAudio}
          >
            <AudioButton
              audioUrls={[
                `https://alfabetiza.s3-sa-east-1.amazonaws.com/${urlWord}`,
              ]}
              size={'25'}
              color={colors.grayText}
            />
            <UploadButton color={colors.grayText} />
            <TextInput
              value={word}
              onChange={changeName}
              color={colors.dimmedPrimary}
              width={'20%'}
            />
            <WordSubFieldWrapper onClick={toggleButtons}>
              {showRadioButtons ? (
                <StartsWithTheLetterInputField
                  word={word}
                  updateAudio={updateAudio}
                  startsWithTheLetter={startsWithTheLetter}
                />
              ) : (
                resposta
              )}
            </WordSubFieldWrapper>
          </DragAndDrop>
        </WordAndAnswerWrapper>
        <WordRightAnswerWrapper>
          <DragAndDrop
            audioFilePrefix={audioFilePrefix}
            updateRightAnswerAudio={updateAudio}
          >
            <AudioButton
              audioUrls={[
                `https://alfabetiza.s3-sa-east-1.amazonaws.com/${urlRightAnswerExplanation}`,
              ]}
              size={'25'}
              color={colors.grayText}
            />
            <UploadButton color={colors.grayText} />
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
        </WordRightAnswerWrapper>
        <WordWrongAnswerWrapper>
          <DragAndDrop
            audioFilePrefix={audioFilePrefix}
            updateWrongAnswerAudio={updateAudio}
          >
            <AudioButton
              audioUrls={[
                `https://alfabetiza.s3-sa-east-1.amazonaws.com/${urlWrongAnswerExplanation}`,
              ]}
              size={'25'}
              color={colors.grayText}
            />
            <UploadButton color={colors.grayText} />
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
