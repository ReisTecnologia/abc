const { ApolloServer, gql } = require('apollo-server-lambda')
import db from './dbData/db'
import { v4 as uuidv4 } from 'uuid'

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

  type AddLessonResponse {
    success: Boolean!
    lessons: [Lesson]
  }

  type DeleteLessonResponse {
    success: Boolean!
    lessons: [Lesson]
  }

  type Query {
    lessons: [Lesson]
    lesson(id: String!): Lesson
  }

  type Mutation {
    addLesson: AddLessonResponse
    deleteLesson(id: ID!): DeleteLessonResponse
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
  Mutation: {
    addLesson: async (parent, args, context) => {
      const success = await db
        .addLesson(uuidv4())
        .then(() => true)
        .catch(() => false)
      const lessons = await db.getLessons()
      return { success, lessons }
    },
    deleteLesson: async (parent, args, context) => {
      const success = await db
        .deleteLesson(args.id)
        .then((u) => {console.log('deleted', u); return true})
        .catch(() => false)
      return { success }
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
exports.handler = server.createHandler()
