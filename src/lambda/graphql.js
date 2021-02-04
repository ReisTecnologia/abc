const { ApolloServer } = require('apollo-server-lambda')
import db from './dbData/db'
import { v4 as uuidv4 } from 'uuid'
import typeDefs from './graphql/typeDefs'
const AWS = require('aws-sdk')
import { getAllFilesFromLesson } from './graphql/getAllFilesFromLesson'
import { detectOrphanFiles } from './graphql/detectOrphanFiles'

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
      const dbLessonFiles = getAllFilesFromLesson(lesson)
      const s3 = new AWS.S3({
        accessKeyId: process.env.MY_AWS_BUCKET_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_BUCKET_SECRET_ACCESS_KEY,
      })
      var params = {
        Bucket: process.env.REACT_APP_MY_AWS_BUCKET_NAME,
        Prefix: `${args.id}___`,
      }
      const list = await s3.listObjectsV2(params).promise()
      const bucketFiles = list.Contents.map(({ Key }) => Key)
      const orphanFiles = detectOrphanFiles(dbLessonFiles, bucketFiles)
      if (orphanFiles.length) {
        console.log('orphanFiles', orphanFiles)
        const deleteParams = {
          Bucket: process.env.REACT_APP_MY_AWS_BUCKET_NAME,
          Delete: {
            Objects: orphanFiles.map((file) => ({ Key: file })),
            Quiet: true,
          },
        }
        await s3.deleteObjects(deleteParams).promise()
      }
      return { success: true }
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
