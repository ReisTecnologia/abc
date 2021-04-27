import React, { useCallback } from 'react'
import { AnswerChoiceWrapper } from './Word.styles'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const RadioWrapper = styled.input`
  margin-right: 5px;
  margin-top: 3px;
`
const LabelWrapper = styled.label`
  display: flex;
  padding-right: 15px;
`

export const StartsWithTheLetterInputField = ({
  word,
  updateAudio,
  startsWithTheLetter,
}) => {
  const setStartsWithTheLetterTrue = useCallback(() => {
    updateAudio({ startsWithTheLetter: true })
  }, [updateAudio])

  const setStartsWithTheLetterFalse = useCallback(() => {
    updateAudio({ startsWithTheLetter: false })
  }, [updateAudio])
  return (
    <AnswerChoiceWrapper>
      <LabelWrapper onClick={setStartsWithTheLetterTrue}>
        <RadioWrapper
          type="radio"
          name={`answer:${word}`}
          onChange={setStartsWithTheLetterTrue}
          defaultChecked={startsWithTheLetter}
        />
        Certo
      </LabelWrapper>
      <LabelWrapper onClick={setStartsWithTheLetterFalse}>
        <RadioWrapper
          type="radio"
          name={`answer:${word}`}
          onChange={setStartsWithTheLetterFalse}
          defaultChecked={!startsWithTheLetter}
        />
        Errado
      </LabelWrapper>
    </AnswerChoiceWrapper>
  )
}
StartsWithTheLetterInputField.propTypes = {
  word: PropTypes.string,
  updateAudio: PropTypes.func,
  startsWithTheLetter: PropTypes.bool,
}
