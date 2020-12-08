import React from "react"
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { gql, useQuery } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql",
  cache: new InMemoryCache(),
})


const LESSONS = gql`
  query {
    lessons {
      id
      name
    }
  }
`


const ApolloApp = (Wrapped) => (
  <ApolloProvider client={client}>
    <Wrapped />
  </ApolloProvider>
)

const Wrapped = () => {
  const { data } = useQuery(LESSONS)
  const lessons = data && data.lessons ? data.lessons :  []
  return (
    <>
      <h1> aulas </h1>
      {lessons.map(
        ({ id, name }) => <div> id: {id}, name: {name} </div>
      )}
    </>
  )
}

export default () => ApolloApp(Wrapped)
