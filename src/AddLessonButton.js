import React from 'react'
import { gql, useMutation } from '@apollo/client'

export const ADD_LESSON = gql`
  mutation addLesson {
    addLesson {
      success
    }
  }
`

export const AddLessonButton = ({afterAdd}) => {
  const [addLesson, { loading }] = useMutation(ADD_LESSON, {onCompleted: afterAdd})
  return (
    <div>
      {loading ? '...' : <button onClick={addLesson}>+</button>}
    </div>
  )
}
