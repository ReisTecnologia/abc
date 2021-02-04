const { ApolloServer } = require('apollo-server-lambda')
import db from './dbData/db'
import { v4 as uuidv4 } from 'uuid'
import typeDefs from './graphql/typeDefs'

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
    cleanupLessonFiles: async (parent, args) => {
      const lesson = await db.getLesson(args.id)
      console.log('lesson', lesson)
      return { success }
    },

    editLesson: async (parent, args) => {
      let success = false
      let lesson = false
      await db
        .editLesson(args.id, args.input.name, args.input.elements)
        .then((updatedItem) => {
          lesson = updatedItem
          success = true
        })
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
