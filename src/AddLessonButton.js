import React from 'react'
import { gql, useMutation } from '@apollo/client'

export const ADD_LESSON = gql`
<<<<<<< HEAD
  mutation addLesson($id: ID = test) {
=======
  mutation addLesson($id: id = test) {
>>>>>>> 0ef37d0b7090d2c2795a4ed63917a9daaf0d1f50
    addLesson(id: $id) {
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
  var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }
  var randomID = ID()
  const [addLesson] = useMutation(ADD_LESSON, { variables: { id: randomID } })

  return (
    <div>
      <button onClick={addLesson}>+</button>
    </div>
  )
}
