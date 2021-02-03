import React from 'react'
import PropTypes from 'prop-types'
import { NameInputFieldWrapper } from './NameInputFieldWrapper'
import styled from 'styled-components'

export const InputField = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  padding-left: 5px;
`

export const NameInputField = ({ lessonName, setLessonName }) => {
  const handleInputChange = (e) => {
    setLessonName(e.target.value)
  }

  return (
    <NameInputFieldWrapper>
      <label>
        Nome da Aula:
        <InputField
          type="text"
          value={lessonName}
          onChange={handleInputChange}
        />
      </label>
    </NameInputFieldWrapper>
  )
}

NameInputField.propTypes = {
  lessonName: PropTypes.string.isRequired,
  setLessonName: PropTypes.func.isRequired,
}
