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
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
