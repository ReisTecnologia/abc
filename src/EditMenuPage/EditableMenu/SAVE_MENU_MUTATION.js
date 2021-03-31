import { gql } from '@apollo/client'

export const SAVE_MENU_MUTATION = gql`
  mutation editMenu($id: ID!, $input: EditMenuInput!) {
    editMenu(id: $id, input: $input) {
      success
      menu {
        name
        id
        elements {
          lessonId
        }
      }
    }
  }
`
