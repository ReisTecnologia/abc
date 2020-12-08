import React from "react"
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { gql, useQuery } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql",
  cache: new InMemoryCache(),
})


const HELLO = gql`
  query Hello {
    hello
  }
`


const ApolloApp = (Wrapped) => (
  <ApolloProvider client={client}>
    <Wrapped />
  </ApolloProvider>
)

const Wrapped = () => {
  const { loading, error, data } = useQuery(HELLO)
  console.log("data", {data, error, loading})
  return <span> dude </span>
}

export default () => ApolloApp(Wrapped)
