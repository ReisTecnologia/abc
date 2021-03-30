import { gql } from '@apollo/client'

export const ADD_USER_MUTATION = gql`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
      success
    }
  }
`
