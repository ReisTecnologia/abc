import { gql } from '@apollo/client'

export const USERS_QUERY = gql`
  query {
    users {
      login
      name
      id
      password
      type
    }
  }
`
