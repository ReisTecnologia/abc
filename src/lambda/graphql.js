const { ApolloServer, gql } = require('apollo-server-lambda')
import db from './dbData/db'

const typeDefs = gql`
  type LessonItem {
    id: ID!
    name: String!
  }

  type Lesson {
    id: ID!
    name: String!
  }
  type Query {
    lessons: [Lesson]
    lesson: Lesson
  }
`

const resolvers = {
  Query: {
    lessons: async (parent, args, context) => {
      const { Items: lessons } = await db.getLessons()
      return lessons
      return [{
        id: 'a',
        name: 'a'
      },
      {
        id: 'e',
        name: 'e'
      },
      {
        id: 'i',
        name: 'i'
      },
      {
        id: 'o',
        name: 'o'
      },
      {
        id: 'u',
        name: 'u'
      }]
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
