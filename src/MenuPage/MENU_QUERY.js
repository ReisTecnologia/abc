import { gql } from '@apollo/client'

export const MENU_QUERY = gql`
  query($id: String!) {
    menu(id: $id) {
      id
      name
      elements {
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
