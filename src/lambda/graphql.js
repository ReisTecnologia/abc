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
    audioUrls: [String]
    urlVideo: String
    description: String
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

  type EditLessonResponse {
    success: Boolean!
    lesson: Lesson
  }

  input EditLessonInput {
    name: String!
  }

  type Query {
    lessons: [Lesson]
    lesson(id: String!): Lesson
  }

  type Mutation {
    addLesson: AddLessonResponse
    deleteLesson(id: ID!): DeleteLessonResponse
    editLesson(id: ID!, input: EditLessonInput!): EditLessonResponse
  }
`

const resolvers = {
  Query: {
    lessons: async () => {
      const lessons = await db.getLessons()
      return lessons
    },
    lesson: async (parent, args) => {
      const lesson = await db.getLesson(args.id)
      return lesson
    },
  },
  Mutation: {
    addLesson: async () => {
      const success = await db
        .addLesson(uuidv4())
        .then(() => true)
        .catch(() => false)
      const lessons = await db.getLessons()
      return { success, lessons }
    },
    deleteLesson: async (parent, args) => {
      const success = await db
        .deleteLesson(args.id)
        .then((u) => {
          console.log('deleted', u)
          return true
        })
        .catch(() => false)
      return { success }
    },

    editLesson: async (parent, args) => {
      const success = await db
        .editLesson(args.id, args.input.name)
        .then((updatedItem) => {
          console.log('name updated', updatedItem)
          return true
        })
        .catch(() => false)
      const lesson = await db.getLesson(args.id)
      return { success, lesson }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})
exports.handler = server.createHandler()
