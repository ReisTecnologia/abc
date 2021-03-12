const { ApolloServer } = require('apollo-server-lambda')
import db from './dbData/db'
import { v4 as uuidv4 } from 'uuid'
import typeDefs from './graphql/typeDefs'
const AWS = require('aws-sdk')
// const pbkdf2 = require('pbkdf2')
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
    menu: async (parent, args) => {
      const menu = await db.getMenu(args.id)
      return menu
    },
    menus: async (parend, args, context) => {
      console.log('menus: context', context)
      const menus = db.getMenus()
      return menus
    },
    user: async (parent, args) => {
      const user = await db.getUser(args.id)
      return user
    },
    users: async () => {
      const users = db.getUsers()
      return users
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
    addMenu: async () => {
      const success = await db
        .addMenu(uuidv4())
        .then(() => true)
        .catch((e) => {
          console.log(e)
          return false
        })
      return { success }
    },
    deleteLesson: async (parent, args) => {
      let s3Success = false
      const getDeleteObjects = (listedObjects) => {
        return listedObjects.Contents.reduce(
          (array, { Key }) => [
            ...array,
            {
              Key,
            },
          ],
          []
        )
      }
      const s3 = new AWS.S3({
        accessKeyId: process.env.MY_AWS_BUCKET_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_BUCKET_SECRET_ACCESS_KEY,
      })
      var params = {
        Bucket: process.env.REACT_APP_MY_AWS_BUCKET_NAME,
        Prefix: `${args.id}___`,
      }
      const list = await s3.listObjectsV2(params).promise()
      const deleteParams = {
        Bucket: process.env.REACT_APP_MY_AWS_BUCKET_NAME,
        Delete: {
          Objects: getDeleteObjects(list),
          Quiet: true,
        },
      }
      const dbSuccess = await db
        .deleteLesson(args.id)
        .then(() => true)
        .catch(() => false)
      if (dbSuccess) {
        s3Success = await s3
          .deleteObjects(deleteParams)
          .promise()
          .then(() => true)
          .catch(() => false)
      }
      return { dbSuccess, s3Success }
    },
    deleteMenu: async (parent, args) => {
      const success = await db
        .deleteMenu(args.id)
        .then(() => true)
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
    editMenu: async (parent, args) => {
      let success = false
      let menu = false
      await db
        .editMenu(args.id, args.input.name, args.input.elements)
        .then((updatedItem) => {
          menu = updatedItem
          success = true
        })
      return { success, menu }
    },
    editUser: async (parent, args) => {
      let success = await db
        .editUser(
          args.input.login,
          args.input.previousLogin,
          args.input.name,
          args.input.password,
          args.input.type,
          args.id
        )
        .then(() => true)
        .catch(() => false)
      const user = await db.getUser(args.id)
      const userLogin = await db.getUser(`login#${args.input.login}`)
      return { success, user, userLogin }
    },
    addUser: async (parent, args) => {
      let success = false
      success = await db
        .addUser(
          uuidv4(),
          args.input.name,
          args.input.login,
          // pbkdf2
          //   .pbkdf2Sync(args.input.password, 'salt', 1, 32, 'sha512')
          //   .toString(),
          args.input.password,
          args.input.type
        )
        .then(() => true)
        .catch(() => false)
      const users = await db.getUsers()
      return { success, users }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

const invokeHandler = (event, context, handler) => {
  return new Promise((resolve, reject) => {
    const callback = (error, body) => (error ? reject(error) : resolve(body))
    handler(event, context, callback)
  })
}

exports.handler = async (event, context) => {
  const graphqlHandler = server.createHandler({
    cors: {
      exposedHeaders: 'x-access-token,x-refresh-token',
      origin: '*',
      credentials: true,
    },
  })

  // grab the headers here and validate them
  console.log('event.headers', event.headers)

  let response
  try {
    // if you validate the jwt, you can inject the user in the context to grab it in the resolvers...
    const loggedUser = {}
    response = await invokeHandler(
      event,
      { loggedUser, ...context },
      graphqlHandler
    )
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  } finally {
    //
  }
  // I'm not sure if you really need this, but this is a way to set this headers in the response
  // if you don't need it, please let me know, because all this "invokeHandler part" may be discarded if that's the case
  return {
    ...response,
    headers: {
      ...response.headers,
      'x-access-token': 'acesso',
      'x-refresh-token': 'refresh',
    },
  }
}
