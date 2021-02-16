import { gql } from '@apollo/client'

export const ADD_LESSON_MUTATION = gql`
  mutation addLesson {
    addLesson {
      success
    }
  }
`
