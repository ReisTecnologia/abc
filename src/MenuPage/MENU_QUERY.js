import { gql } from '@apollo/client'

export const MENU_QUERY = gql`
  query($id: String!) {
    menu(id: $id) {
      id
      name
      elements {
        initials
        lessonId
      }
    }
  }
`
