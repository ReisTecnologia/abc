import React from 'react'
import { gql, useMutation } from '@apollo/client'

export const ADD_LESSON = gql`
  mutation addLesson {
    addLesson {
      success
    }
  }
`

export const AddLessonButton = () => {
  const [addLesson] = useMutation(ADD_LESSON)

  return (
    <div>
      <button onClick={addLesson}>+</button>
    </div>
  )
}
