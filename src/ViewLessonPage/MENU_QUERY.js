import { gql } from '@apollo/client'

export const MENU_QUERY = gql`
  query($id: String!) {
    menu(id: $id) {
      backgroundImage
      elements {
        freeLesson
        lessonId
      }
    }
  }
`
