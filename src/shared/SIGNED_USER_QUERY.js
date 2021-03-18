import { gql } from '@apollo/client'

export const SIGNED_USER_QUERY = gql`
  query {
    signedInUser {
      type
    }
  }
`
