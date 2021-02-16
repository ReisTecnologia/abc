import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const NameInputFieldWrapper = styled.div`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : null)};
  position: absolute;
  left: 0;
  padding-left: 10px;
  height: 1.5rem;
`

const InputField = styled.input`
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
