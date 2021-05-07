import { gql } from '@apollo/client'

export const SIGNED_USER_QUERY = gql`
  query {
    signedInUser {
      name
      login
      id
      type
      paidMenus {
        id
      }
    }
  }
`
