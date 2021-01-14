import React, { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'

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

export const NameInputField = ({ name, id, cancel }) => {
  const [lessonName, setLessonName] = useState(name)

  const [handleSubmit] = useMutation(EDIT_LESSON_NAME, {
    variables: { id, input: { name: lessonName } },
  })

  const handleInputChange = (e) => {
    setLessonName(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome da Aula:
        <input type="text" value={lessonName} onChange={handleInputChange} />
      </label>
      <input type="submit" value="Submit" />
      <button onClick={cancel}>Cancel</button>
    </form>
  )
}

NameInputField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
}
