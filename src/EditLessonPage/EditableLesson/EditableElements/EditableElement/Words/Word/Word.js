import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DeleteWordButton } from './DeleteWordButton'
import { TextInput } from './TextInput'
import { WordInputFieldsWrapper } from './WordInputFieldsWrapper'
import { WordButtonWrapper } from './WordButtonWrapper'
import { WordWrapper } from './WordWrapper'
import { StartsWithTheLetterInputField } from './StartsWithTheLetterInputField'
import { WordUploadInputField } from './WordUploadInputField'
import { WordSubFieldWrapper } from './WordSubFieldWrapper'
import { WordInfoWrapper } from './WordInfoWrapper'
import { WordAnswerInfoWrapper } from './WordAnswerInfoWrapper'
import { WordFirstLineWrapper } from './WordFirstLineWrapper'
import { AudioButton } from 'shared/AudioButton'
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
  const [showWordFields, setShowWordFields] = useState(false)

  const showFields = () => setShowWordFields(true)
  const hideFields = () => setShowWordFields(false)

  const toggleFields = () => (showWordFields ? hideFields() : showFields())

  const resposta = startsWithTheLetter ? 'Certo' : 'Errado'

  return (
    <WordWrapper>
      <WordButtonWrapper>
        <AudioButton
          audioUrls={[
            `https://alfabetiza.s3-sa-east-1.amazonaws.com/${urlWord}`,
          ]}
          size={'20'}
        />
        <AudioButton
          audioUrls={[
            `https://alfabetiza.s3-sa-east-1.amazonaws.com/${urlRightAnswerExplanation}`,
          ]}
          size={'20'}
        />
        <AudioButton
          audioUrls={[
            `https://alfabetiza.s3-sa-east-1.amazonaws.com/${urlWrongAnswerExplanation}`,
          ]}
          size={'20'}
        />
      </WordButtonWrapper>
      {!showWordFields && (
        <WordInfoWrapper>
          <WordFirstLineWrapper>
            <TextInput
              value={word}
              onChange={changeName}
              color={colors.dimmedPrimary}
            />
            <WordSubFieldWrapper onClick={toggleFields}>
              {resposta}
            </WordSubFieldWrapper>
          </WordFirstLineWrapper>
          <WordAnswerInfoWrapper>
            Acertou?
            <TextInput
              value={rightAnswerExplanation}
              onChange={changeRightAnswerExplanation}
              color={colors.grayText}
            />
          </WordAnswerInfoWrapper>
          <WordAnswerInfoWrapper>
            Errou?
            <TextInput
              value={wrongAnswerExplanation}
              onChange={changeWrongAnswerExplanation}
              color={colors.grayText}
            />
          </WordAnswerInfoWrapper>
        </WordInfoWrapper>
      )}
      {showWordFields && (
        <WordInputFieldsWrapper>
          <TextInput value={word} onChange={changeName} />
          <WordUploadInputField
            audioFilePrefix={audioFilePrefix}
            updateWordAudio={updateAudio}
            inputBoxMessage={'Clique aqui para escolher o áudio da palavra'}
          />
          <StartsWithTheLetterInputField
            word={word}
            startsWithTheLetter={startsWithTheLetter}
            updateAudio={updateAudio}
          />
          <TextInput
            value={rightAnswerExplanation}
            onChange={changeRightAnswerExplanation}
          />
          <WordUploadInputField
            audioFilePrefix={audioFilePrefix}
            updateCorrectAnswerAudio={updateAudio}
            inputBoxMessage={'Clique aqui para escolher o áudio do acerto'}
          />
          <TextInput
            value={wrongAnswerExplanation}
            onChange={changeWrongAnswerExplanation}
          />
          <WordUploadInputField
            audioFilePrefix={audioFilePrefix}
            updateWrongAnswerAudio={updateAudio}
            inputBoxMessage={'Clique aqui para escolher o áudio do erro'}
          />
          <DeleteWordButton deleteWord={deleteWord} />
        </WordInputFieldsWrapper>
      )}
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
