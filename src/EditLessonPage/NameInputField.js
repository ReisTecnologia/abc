import React, { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { NameInputFieldWrapper } from './NameInputFieldWrapper'
import styled from 'styled-components'

export const InputField = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  padding-left: 5px;
`

export const EDIT_LESSON_NAME = gql`
  mutation editLesson($id: ID!, $input: EditLessonInput!) {
    editLesson(id: $id, input: $input) {
      success
      lesson {
        name
      }
    }
  }
`

export const NameInputField = ({ name, id }) => {
  const [lessonName, setLessonName] = useState(name)

  const [handleSubmit] = useMutation(EDIT_LESSON_NAME, {
    variables: { id, input: { name: lessonName } },
  })

  const handleInputChange = (e) => {
    setLessonName(e.target.value)
  }

  const submitOnEnter = (e) => {
    if (e.charCode === 13) {
      handleSubmit()
    }
  }

  return (
    <NameInputFieldWrapper>
      <label>
        Nome da Aula:
        <InputField
          type="text"
          onKeyPress={submitOnEnter}
          value={lessonName}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </label>
    </NameInputFieldWrapper>
  )
}

NameInputField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}
