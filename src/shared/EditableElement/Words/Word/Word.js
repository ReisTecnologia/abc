import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Uploader } from './Uploader'
import { InputWrapper } from './InputWrapper'
import { DeleteWordButton } from './DeleteWordButton'
import { TextInput } from './TextInput'
import { WordInputFieldsWrapper } from './WordInputFieldsWrapper'
import { WordNumberWrapper } from './WordNumberWrapper'
import { WordNumber } from './WordNumber'
import { WordWrapper } from './WordWrapper'
import { WordFieldWrapper } from './WordFieldWrapper'
import { AnswerChoiceWrapper } from './AnswerChoiceWrapper'

export const Word = ({
  audioFilePrefix,
  word,
  updateAudio,
  startsWithTheLetter,
  deleteWord,
  index,
  changeName,
}) => {
  const [showWordFields, setShowWordFields] = useState(false)

  const showFields = () => setShowWordFields(true)
  const hideFields = () => setShowWordFields(false)

  const toggleFields = () => (showWordFields ? hideFields() : showFields())

  const wordUploadInputField = (
    <>
      <InputWrapper>
        <Uploader
          audioFilePrefix={audioFilePrefix}
          updateWordAudio={updateAudio}
          inputBoxMessage={'Clique aqui para escolher o áudio da palavra'}
        />
      </InputWrapper>
    </>
  )

  const correctWordUploadInputField = (
    <>
      <InputWrapper>
        <Uploader
          audioFilePrefix={audioFilePrefix}
          updateCorrectAnswerAudio={updateAudio}
          inputBoxMessage={'Clique aqui para escolher o áudio do acerto'}
        />
      </InputWrapper>
    </>
  )

  const wrongWordUploadInputField = (
    <>
      <InputWrapper>
        <Uploader
          audioFilePrefix={audioFilePrefix}
          updateWrongAnswerAudio={updateAudio}
          inputBoxMessage={'Clique aqui para escolher o áudio do erro'}
        />
      </InputWrapper>
    </>
  )

  const setStartsWithTheLetterTrue = useCallback(() => {
    updateAudio({ startsWithTheLetter: true })
  }, [updateAudio])

  const setStartsWithTheLetterFalse = useCallback(() => {
    updateAudio({ startsWithTheLetter: false })
  }, [updateAudio])

  const startsWithTheLetterInputField = (
    <>
      <AnswerChoiceWrapper>
        <div>{`A resposta é:`}</div>
        <label>
          <input
            type="radio"
            name={`answer:${word}`}
            onClick={setStartsWithTheLetterTrue}
            checked={startsWithTheLetter}
          />
          Certo
        </label>
        <label>
          <input
            type="radio"
            name={`answer:${word}`}
            onClick={setStartsWithTheLetterFalse}
            checked={!startsWithTheLetter}
          />
          Errado
        </label>
      </AnswerChoiceWrapper>
    </>
  )

  return (
    <WordWrapper>
      <WordNumberWrapper onClick={toggleFields}>
        <WordNumber>{index + 1}</WordNumber>
      </WordNumberWrapper>
      {!showWordFields && (
        <WordFieldWrapper onClick={toggleFields}>{word}</WordFieldWrapper>
      )}
      {showWordFields && (
        <>
          <WordInputFieldsWrapper>
            <TextInput value={word} onChange={changeName} />
            <WordFieldWrapper>{wordUploadInputField}</WordFieldWrapper>
            <WordFieldWrapper>{startsWithTheLetterInputField}</WordFieldWrapper>
            <WordFieldWrapper>{correctWordUploadInputField}</WordFieldWrapper>
            <WordFieldWrapper>{wrongWordUploadInputField}</WordFieldWrapper>
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
  updateAudio: PropTypes.func,
  deleteWord: PropTypes.func,
  index: PropTypes.number,
  changeName: PropTypes.func,
  startsWithTheLetter: PropTypes.bool,
}
