import { gql } from '@apollo/client'

export const SAVE_PASSWORD_MUTATION = gql`
  mutation editUserPassword($id: ID!, $input: EditUserPasswordInput!) {
    editUserPassword(id: $id, input: $input) {
      success
    }
  }
`
