import { gql } from '@apollo/client'

export const ADD_MENU_MUTATION = gql`
  mutation addMenu {
    addMenu {
      success
    }
  }
`
