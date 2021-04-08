import { gql } from '@apollo/client'

export const SAVE_LESSON_MUTATION = gql`
  mutation editLesson($id: ID!, $input: EditLessonInput!) {
    editLesson(id: $id, input: $input) {
      success
      lesson {
        name
        elements {
          type
        }
        image
        initials
      }
    }
  }
`
