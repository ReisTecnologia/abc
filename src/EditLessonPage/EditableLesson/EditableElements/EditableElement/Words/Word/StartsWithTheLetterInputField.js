import React, { useCallback } from 'react'
import { AnswerChoiceWrapper } from './AnswerChoiceWrapper'
import { WordFieldWrapper } from './WordFieldWrapper'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const RadioWrapper = styled.input`
  margin-right: 5px;
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
    <WordFieldWrapper>
      <AnswerChoiceWrapper>
        <LabelWrapper>
          <RadioWrapper
            type="radio"
            name={`answer:${word}`}
            onClick={setStartsWithTheLetterTrue}
            checked={startsWithTheLetter}
          />
          Certo
        </LabelWrapper>
        <LabelWrapper>
          <RadioWrapper
            type="radio"
            name={`answer:${word}`}
            onClick={setStartsWithTheLetterFalse}
            checked={!startsWithTheLetter}
          />
          Errado
        </LabelWrapper>
      </AnswerChoiceWrapper>
    </WordFieldWrapper>
  )
}
StartsWithTheLetterInputField.propTypes = {
  word: PropTypes.string,
  updateAudio: PropTypes.func,
  startsWithTheLetter: PropTypes.bool,
}
