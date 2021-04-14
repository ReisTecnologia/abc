import { gql } from '@apollo/client'

export const SAVE_USER_MUTATION = gql`
  mutation editUser($id: ID!, $input: EditUserInput!) {
    editUser(id: $id, input: $input) {
      success
      user {
        id
        name
        login
        password
        type
        email
      }
    }
  }
`
