import { gql } from '@apollo/client'

export const LESSON_QUERY = gql`
  query($id: String!) {
    lesson(id: $id) {
      id
      name
      image
      initials
      elements {
        type
        letter
        items
        correctLetters
        audioUrls
        audios {
          name
          url
        }
        urlVideo
        videos {
          name
          url
        }
        description
        text
        words {
          startsWithTheLetter
          word
          urlRightAnswerExplanation
          rightAnswerExplanation
          urlWrongAnswerExplanation
          wrongAnswerExplanation
          urlWord
        }
        conclusionAudio {
          name
          url
        }
        initialAudio {
          name
          url
        }
      }
    }
  }
`
