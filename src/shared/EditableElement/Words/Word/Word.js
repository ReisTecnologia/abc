import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DeleteWordButton } from './DeleteWordButton'
import { TextInput } from './TextInput'
import { WordInputFieldsWrapper } from './WordInputFieldsWrapper'
import { WordNumberWrapper } from './WordNumberWrapper'
import { WordNumber } from './WordNumber'
import { WordWrapper } from './WordWrapper'
import { WordFieldWrapper } from './WordFieldWrapper'
import { StartsWithTheLetterInputField } from './StartsWithTheLetterInputField'
import { WordUploadInputField } from './WordUploadInputField'
import { WordSubFieldWrapper } from './WordSubFieldWrapper'
import { WordInfoWrapper } from './WordInfoWrapper'

export const Word = ({
  audioFilePrefix,
  word,
  rightAnswerExplanation,
  wrongAnswerExplanation,
  updateAudio,
  deleteWord,
  index,
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
      <WordNumberWrapper onClick={toggleFields}>
        <WordNumber>{index + 1}</WordNumber>
      </WordNumberWrapper>
      {!showWordFields && (
        <WordInfoWrapper>
          <WordFieldWrapper onClick={toggleFields}>{word} </WordFieldWrapper>
          <WordSubFieldWrapper>A resposta é: {resposta}</WordSubFieldWrapper>
          <WordSubFieldWrapper>
            Acertou? {rightAnswerExplanation}
          </WordSubFieldWrapper>
          <WordSubFieldWrapper>
            Errou? {wrongAnswerExplanation}
          </WordSubFieldWrapper>
        </WordInfoWrapper>
      )}
      {showWordFields && (
        <>
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
        </>
      )}
    </WordWrapper>
  )
}

Word.propTypes = {
  audioFilePrefix: PropTypes.string,
  word: PropTypes.string,
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
