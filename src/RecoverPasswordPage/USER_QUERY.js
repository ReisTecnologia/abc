import { gql } from '@apollo/client'

export const USER_QUERY = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      login
      email
      name
    }
  }
`
