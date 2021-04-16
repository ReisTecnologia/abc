import { gql } from '@apollo/client'

export const ADD_HASH_USER_MUTATION = gql`
  mutation addHashUser($input: AddHashUserInput!) {
    addHashUser(input: $input) {
      success
      emailSent
    }
  }
`
