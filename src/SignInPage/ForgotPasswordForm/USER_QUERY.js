import { gql } from '@apollo/client'

export const USER_QUERY = gql`
  query($login: String!) {
    user(login: $login) {
      id
      login
    }
  }
`
