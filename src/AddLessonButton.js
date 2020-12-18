import React from 'react'
import { gql, useMutation } from '@apollo/client'

export const ADD_LESSON = gql`
  mutation addLesson($id: String!) {
    lesson(id: $id) {
      id
      name
      elements {
        type
        letter
        correctLetters
        urlAudio
        urlAudios
        urlVideo
        texto
        text
        words {
          startsWithTheLetter
          word
          urlRightAnswerExplanation
          urlWrongAnswerExplanation
          urlWord
        }
      }
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
