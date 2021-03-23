import { gql } from '@apollo/client'

export const SIGNIN_MUTATION = gql`
  mutation SignIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      refreshToken
      accessToken
    }
  }
`
