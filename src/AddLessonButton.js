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
  var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }
  var randomID = ID()
  return (
    <div>
      <button onClick={addLesson({ variables: { id: randomID } })}>+</button>
    </div>
  )
}
