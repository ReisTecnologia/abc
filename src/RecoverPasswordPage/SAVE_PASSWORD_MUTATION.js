import { gql } from '@apollo/client'

export const SAVE_PASSWORD_MUTATION = gql`
  mutation editUserPassword(
    $id: ID!
    $hashUserId: ID
    $input: EditUserPasswordInput!
  ) {
    editUserPassword(id: $id, hashUserId: $hashUserId, input: $input) {
      success
    }
  }
`
