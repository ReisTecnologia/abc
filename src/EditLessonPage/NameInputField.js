import React, { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { NameInputFieldWrapper } from './NameInputFieldWrapper'
import { useOnClickOutside } from '../shared/useOnClickOutside'

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

  const [showInput, setShowInput] = useState(false)

  const showTitleInput = () => setShowInput(true)
  const hideTitleInput = () => setShowInput(false)

  const [handleSubmit] = useMutation(EDIT_LESSON_NAME, {
    variables: { id, input: { name: lessonName } },
  })

  const handleInputChange = (e) => {
    setLessonName(e.target.value)
  }

  const submitOnEnter = (e) => {
    if (e.charCode === 13) {
      handleSubmit().then(hideTitleInput)
    }
  }

  const onClickOutsideRef = useOnClickOutside(hideTitleInput)

  return (
    <NameInputFieldWrapper ref={onClickOutsideRef} onClick={showTitleInput}>
      {showInput && (
        <label>
          Nome da Aula:
          <input
            type="text"
            onKeyPress={submitOnEnter}
            value={lessonName}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </label>
      )}
      {!showInput && <span> EDIT: {lessonName} </span>}
    </NameInputFieldWrapper>
  )
}

NameInputField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}
