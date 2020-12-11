import db from './dbData/db'
const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Word {
    startsWithTheLetter: Boolean!
    word: String!
    urlRightAnswerExplanation: String
    urlWrongAnswerExplanation: String
    urlWord: String
  }

  type Element {
    type: String!
    letter: String
    correctLetters: [String]
    urlAudio: String
    urlAudios: [String]
    urlVideo: String
    texto: String
    text: String
    words: [Word]
  }

  type Lesson {
    id: ID!
    name: String!
    elements: [Element]
  }

  type Query {
    lessons: [Lesson]
    lesson(id: String!): Lesson
  }
`

const resolvers = {
  Query: {
    lessons: async (parent, args, context) => {
      const lessons = await db.getLessons()
      return lessons
    },
    lesson: async (parent, args, context) => {
      const lesson = await db.getLesson(args.id)
      return lesson
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()