import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Uploader } from './Uploader'
import { InputWrapper } from './InputWrapper'
import { DeleteWordButton } from './DeleteWordButton'
import { TextAndInput } from '../../TextAndInput'
import { WordInputFieldsWrapper } from './WordInputFieldsWrapper'
import { WordNumberWrapper } from './WordNumberWrapper'
import { WordNumber } from './WordNumber'

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
  const showWordInput = () => setShowWordUploadInput(true)
  const hideWordInput = () => setShowWordUploadInput(false)
  const showWrongInput = () => setshowWrongAnwserUploadInput(true)
  const hideWrongInput = () => setshowWrongAnwserUploadInput(false)
  const showCorrectInput = () => setshowCorrectAnwserUploadInput(true)
  const hideCorrectInput = () => setshowCorrectAnwserUploadInput(false)
  const showStartsWithInput = () => setshowStartsWithTheLetterInput(true)
  const hideStartsWithInput = () => setshowStartsWithTheLetterInput(false)

  const toggleWordUploadInput = () =>
    showWordUploadInput ? hideWordInput() : showWordInput()
  const toggleWrongAnswerInput = () =>
    showWrongAnwserUploadInput ? hideWrongInput() : showWrongInput()
  const toggleCorrectAnswerInput = () =>
    showCorrectAnwserUploadInput ? hideCorrectInput() : showCorrectInput()
  const toggleStartsWithTheLetterInput = () =>
    showStartsWithTheLetterInput ? hideStartsWithInput() : showStartsWithInput()

  const wordUploadInputField = showWordUploadInput ? (
    <>
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

  const startsWithTheLetterInputField = showStartsWithTheLetterInput ? (
    <>
      <InputWrapper>
        <input
          type="radio"
          //   checked={updateAudio({ startsWithTheLetter: false })}
        ></input>
        <input
          type="radio"
          //   checked={updateAudio({ startsWithTheLetter: true })}
        ></input>
      </InputWrapper>
    </>
  ) : (
    <div onClick={toggleStartsWithTheLetterInput}>A resposta é</div>
  )

  return (
    <>
      <WordNumberWrapper>
        <WordNumber>{index + 1}</WordNumber>
      </WordNumberWrapper>
      <TextAndInput value={word} onChange={changeName} />
      <WordInputFieldsWrapper>
        <b>{wordUploadInputField}</b>
        <b>{correctWordUploadInputField}</b>
        <b>{wrongWordUploadInputField}</b>
        <b>{startsWithTheLetterInputField}</b>
      </WordInputFieldsWrapper>
      <DeleteWordButton deleteWord={deleteWord} />
    </>
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
