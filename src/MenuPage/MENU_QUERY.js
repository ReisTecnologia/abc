import { gql } from '@apollo/client'

export const MENU_QUERY = gql`
  query($id: String!) {
    menu(id: $id) {
      id
      name
      backgroundImage
      elements {
        freeLesson
        lessonId
        lesson {
          name
          image
          id
          initials
        }
      }
    }
  }
`
