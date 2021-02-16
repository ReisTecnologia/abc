import { gql } from '@apollo/client'

export const MENUS_QUERY = gql`
  query {
    menus {
      id
      name
    }
  }
`
