import { gql } from '@apollo/client'

export const LESSON_QUERY = gql`
  query($id: String!) {
    lesson(id: $id) {
      id
      name
      elements {
        type
        letter
        correctLetters
        audioUrls
        urlVideo
        description
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
