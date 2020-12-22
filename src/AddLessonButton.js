import React from 'react'
import { gql, useMutation } from '@apollo/client'

export const ADD_LESSON = gql`
  mutation addLesson {
    addLesson {
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
      <button onClick={(addLesson, console.log(randomID))}>+</button>
    </div>
  )
}
