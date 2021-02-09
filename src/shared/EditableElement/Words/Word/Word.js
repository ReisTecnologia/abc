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

export const Word = ({
  audioFilePrefix,
  word,
  updateAudio,
  deleteWord,
  index,
  changeName,
}) => {
  const [showWordFields, setShowWordFields] = useState(false)

  const showFields = () => setShowWordFields(true)
  const hideFields = () => setShowWordFields(false)

  const toggleFields = () => (showWordFields ? hideFields() : showFields())

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
            <WordUploadInputField
              audioFilePrefix={audioFilePrefix}
              updateWordAudio={updateAudio}
              inputBoxMessage={'Clique aqui para escolher o áudio da palavra'}
            />
            <StartsWithTheLetterInputField />
            <WordUploadInputField
              audioFilePrefix={audioFilePrefix}
              updateCorrectAnswerAudio={updateAudio}
              inputBoxMessage={'Clique aqui para escolher o áudio do acerto'}
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
  updateAudio: PropTypes.func,
  deleteWord: PropTypes.func,
  index: PropTypes.number,
  changeName: PropTypes.func,
}
