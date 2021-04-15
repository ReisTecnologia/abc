import { gql } from '@apollo/client'

export const USER_QUERY = gql`
  query($login: String, $email: String) {
    user(login: $login, email: $email) {
      id
      login
    }
  }
`
