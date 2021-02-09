import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Uploader } from './Uploader'
import { InputWrapper } from './InputWrapper'
import { DeleteWordButton } from './DeleteWordButton'
import { TextAndInput } from '../../TextAndInput'
import { WordInputFieldsWrapper } from './WordInputFieldsWrapper'
import { WordNumberWrapper } from './WordNumberWrapper'
import { WordNumber } from './WordNumber'
import { WordWrapper } from './WordWrapper'
import { WordFieldWrapper } from './WordFieldWrapper'

export const Word = ({
  audioFilePrefix,
  word,
  updateAudio,
  deleteWord,
  index,
  changeName,
}) => {
  const [showWordUploadInput, setShowWordUploadInput] = useState(false)
  const [
    showStartsWithTheLetterInput,
    setshowStartsWithTheLetterInput,
  ] = useState(false)
  const [showWrongAnwserUploadInput, setshowWrongAnwserUploadInput] = useState(
    false
  )
  const [
    showCorrectAnwserUploadInput,
    setshowCorrectAnwserUploadInput,
  ] = useState(false)
  const [showWordFields, setShowWordFields] = useState(false)

  const showWordInput = () => setShowWordUploadInput(true)
  const hideWordInput = () => setShowWordUploadInput(false)
  const showWrongInput = () => setshowWrongAnwserUploadInput(true)
  const hideWrongInput = () => setshowWrongAnwserUploadInput(false)
  const showCorrectInput = () => setshowCorrectAnwserUploadInput(true)
  const hideCorrectInput = () => setshowCorrectAnwserUploadInput(false)
  const showStartsWithInput = () => setshowStartsWithTheLetterInput(true)
  const hideStartsWithInput = () => setshowStartsWithTheLetterInput(false)
  const showFields = () => setShowWordFields(true)
  const hideFields = () => setShowWordFields(false)

  const toggleWordUploadInput = () =>
    showWordUploadInput ? hideWordInput() : showWordInput()
  const toggleWrongAnswerInput = () =>
    showWrongAnwserUploadInput ? hideWrongInput() : showWrongInput()
  const toggleCorrectAnswerInput = () =>
    showCorrectAnwserUploadInput ? hideCorrectInput() : showCorrectInput()
  const toggleStartsWithTheLetterInput = () =>
    showStartsWithTheLetterInput ? hideStartsWithInput() : showStartsWithInput()
  const hideAllFields = () => {
    hideWordInput()
    hideWrongInput()
    hideCorrectInput()
    hideStartsWithInput()
    hideFields()
  }
  const toggleFields = () => (showWordFields ? hideAllFields() : showFields())

  const wordUploadInputField = showWordUploadInput ? (
    <>
      <div onClick={toggleWordUploadInput}>Áudio da palavra</div>
      <InputWrapper>
        <Uploader
          audioFilePrefix={audioFilePrefix}
          updateWordAudio={updateAudio}
        />
      </InputWrapper>
    </>
  ) : (
    <div onClick={toggleWordUploadInput}>Áudio da palavra</div>
  )

  const correctWordUploadInputField = showCorrectAnwserUploadInput ? (
    <>
      <div onClick={toggleCorrectAnswerInput}>Áudio da resposta certa</div>
      <InputWrapper>
        <Uploader
          audioFilePrefix={audioFilePrefix}
          updateCorrectAnswerAudio={updateAudio}
        />
      </InputWrapper>
    </>
  ) : (
    <div onClick={toggleCorrectAnswerInput}>Áudio da resposta certa</div>
  )

  const wrongWordUploadInputField = showWrongAnwserUploadInput ? (
    <>
      <div onClick={toggleWrongAnswerInput}>Áudio da resposta errada</div>
      <InputWrapper>
        <Uploader
          audioFilePrefix={audioFilePrefix}
          updateWrongAnswerAudio={updateAudio}
        />
      </InputWrapper>
    </>
  ) : (
    <div onClick={toggleWrongAnswerInput}>Áudio da resposta errada</div>
  )

  const updateAnswerCorrect = useCallback(() => {
    updateAudio({ startsWithTheLetter: true })
  }, [updateAudio])

  const updateAnswerWrong = useCallback(() => {
    updateAudio({ startsWithTheLetter: false })
  }, [updateAudio])

  const startsWithTheLetterInputField = showStartsWithTheLetterInput ? (
    <>
      <div onClick={toggleStartsWithTheLetterInput}>{`A resposta é:`}</div>
      <div>
        <input type="radio" name="answer" onClick={updateAnswerCorrect} />
        Certo
        <input type="radio" name="answer" onClick={updateAnswerWrong} />
        Errado
      </div>
    </>
  ) : (
    <div onClick={toggleStartsWithTheLetterInput}>{`A resposta é:`}</div>
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
            <TextAndInput value={word} onChange={changeName} />
            <WordFieldWrapper>{wordUploadInputField}</WordFieldWrapper>
            <WordFieldWrapper>{correctWordUploadInputField}</WordFieldWrapper>
            <WordFieldWrapper>{wrongWordUploadInputField}</WordFieldWrapper>
            <WordFieldWrapper>{startsWithTheLetterInputField}</WordFieldWrapper>
          </WordInputFieldsWrapper>
          <DeleteWordButton deleteWord={deleteWord} />
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
}
