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
