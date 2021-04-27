const { ApolloServer } = require('apollo-server-lambda')
const { AuthenticationError } = require('apollo-server-lambda')
import db from './dbData/db'
import { v4 as uuidv4 } from 'uuid'
import typeDefs from './graphql/typeDefs'
const AWS = require('aws-sdk')
import { verifyPassword, hashPassword } from './handlePassword'
import { getAllFilesFromLesson } from './graphql/getAllFilesFromLesson'
import { detectOrphanFiles } from './graphql/detectOrphanFiles'
import { setTokens } from './JWToken/setTokens'
import { validateTokens } from './JWToken/validateTokens'
const isEmpty = require('lodash.isempty')

const userCheck = (context) => {
  if (isEmpty(context.user)) throw new AuthenticationError('Must authenticate')
  if (context.user.type !== 'admin')
    throw new AuthenticationError('Admin role required')
  else return null
}

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
    menus: async () => {
      const menus = db.getMenus()
      return menus
    },
    user: async (parent, args) => {
      const user = await db.getUser(args.login, args.id, args.email)
      if (!user) throw new AuthenticationError('Invalid user')
      if (user.expdate && user.expdate < Date.now() / 1000)
        throw new Error('Link expired')
      return user
    },
    users: async () => {
      const users = db.getUsers()
      return users
    },
    signedInUser: async (parent, args, context) => {
      if (isEmpty(context.user))
        throw new AuthenticationError('Must authenticate')
      const user = await db.getUser(null, context.user.id)
      return user
    },
  },
  Mutation: {
    signIn: async (parent, args) => {
      const user = await db.getUser(args.login)
      if (!user) throw new AuthenticationError('Invalid login or password')
      const passwordValid = verifyPassword(args.password, user.password)
      if (!passwordValid)
        throw new AuthenticationError('Invalid login or password')
      return setTokens(user)
    },
    addLesson: async (parent, args, context) => {
      userCheck(context)
      const success = await db
        .addLesson(uuidv4())
        .then(() => true)
        .catch(() => false)
      const lessons = await db.getLessons()
      return { success, lessons }
    },
    addMenu: async (parent, args, context) => {
      userCheck(context)
      const success = await db
        .addMenu(uuidv4())
        .then(() => true)
        .catch((e) => {
          console.log(e)
          return false
        })
      return { success }
    },
    deleteLesson: async (parent, args, context) => {
      userCheck(context)
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
    deleteMenu: async (parent, args, context) => {
      userCheck(context)
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

    editLesson: async (parent, args, context) => {
      userCheck(context)
      let success = false
      let lesson = false
      await db
        .editLesson(
          args.id,
          args.input.name,
          args.input.elements,
          args.input.image,
          args.input.initials
        )
        .then((updatedItem) => {
          lesson = updatedItem
          success = true
        })
      return { success, lesson }
    },
    editMenu: async (parent, args, context) => {
      userCheck(context)
      let success = false
      let menu = false
      await db
        .editMenu(
          args.id,
          args.input.name,
          args.input.backgroundImage,
          args.input.elements
        )
        .then((updatedItem) => {
          menu = updatedItem
          success = true
        })
      return { success, menu }
    },
    editUser: async (parent, args, context) => {
      userCheck(context)
      let success = await db
        .editUser(
          args.input.login,
          args.input.previousLogin,
          args.input.name,
          args.input.type,
          args.input.email,
          args.input.previousEmail,
          args.id
        )
        .then(() => true)
        .catch((error) => {
          console.log(error)
          return false
        })
      if (!success) throw Error('Erro ao salvar usuário')
      const user = await db.getUser(null, args.id)
      const userLogin = await db.getUser(null, `login#${args.input.login}`)
      const userEmail = await db.getUser(null, `email#${args.input.email}`)
      return { success, user, userLogin, userEmail }
    },
    editUserPassword: async (parent, args, context) => {
      if (args.hashUserId) {
        let user = await db.getUser(null, args.hashUserId)
        if (user) {
          let success = await db
            .editUserPassword(args.id, hashPassword(args.input.password))
            .then(() => true)
            .catch(() => false)
          return { success }
        }
      } else {
        userCheck(context)
        let success = await db
          .editUserPassword(args.id, hashPassword(args.input.password))
          .then(() => true)
          .catch(() => false)
        if (!success) throw Error('Erro ao salvar senha')
        return { success }
      }
    },
    addUser: async (parent, args) => {
      let success = false
      success = await db
        .addUser(
          uuidv4(),
          args.input.name,
          args.input.login,
          hashPassword(args.input.password),
          args.input.type,
          args.input.email
        )
        .then(() => true)
        .catch(() => false)
      const users = await db.getUsers()
      return { success, users }
    },
    addHashUser: async (parent, args) => {
      let user
      let success = false
      let emailSent = false
      if (args.input.login) user = await db.getUser(args.input.login)
      if (args.input.email)
        user = await db.getUser(null, null, args.input.email)
      if (!user) throw new AuthenticationError('Invalid user or email')
      const hashUserId = uuidv4()
      success = await db
        .addHashUser(hashUserId, user.id, user.email, user.login)
        .then(() => true)
        .catch(() => false)
      if (!success) throw Error('Error on creating hash user')
      const sendPassRecoveryEMail = async () => {
        const ses = new AWS.SES({
          accessKeyId: process.env.MY_AWS_SES_ACCESS_KEY_ID,
          secretAccessKey: process.env.MY_AWS_SES_SECRET_ACCESS_KEY,
          region: 'sa-east-1',
        })
        const sender = process.env.MY_AWS_EMAIL_SENDER
        const recipient = user.email
        const params = {
          Source: sender,
          Destination: {
            ToAddresses: [recipient],
          },
          ReplyToAddresses: [recipient],
          Message: {
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: `Olá ${user.name},
                <br/>
                <br/>
                <br/>
                <br/>
                Recebemos uma solicitação para redefinir a sua senha. Para continuar clique no link abaixo:
                <br/>
                <br/>
                <br/>
                <br/>
                Link: <a href=\"http://localhost:8888/recoverPassword/${hashUserId}\"> Clique aqui para redefinir sua senha </a>
                <br/>
                <br/> 
                <br/>
                <br/>
                <br/>
                <br/>
                <b>Se você não requisitou essa alteração, ignore esse email.</b>`,
              },
            },
            Subject: {
              Charset: 'UTF-8',
              Data: 'Redefinição de senha',
            },
          },
        }
        return ses.sendEmail(params).promise()
      }
      emailSent = await sendPassRecoveryEMail()
        .then(() => true)
        .catch(() => false)
      if (!emailSent) throw Error('Error at email send')
      return { success, emailSent }
    },
  },
  MenuElement: {
    lesson: async (parent) => {
      const lesson = await db.getLesson(parent.lessonId)
      return lesson
        ? lesson
        : {
            id: 'deleted',
            name: 'deleted',
            elements: [],
            initials: '',
            image: '',
          }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  formatError: (err) => {
    console.error(err)
    return err
  },
  context: ({ context }) => context,
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

  const { headerTokens, user } = await validateTokens({
    accessToken: event.headers['x-access-token'],
    refreshToken: event.headers['x-refresh-token'],
    db,
  })
  if (user) context.user = user

  let response
  try {
    response = await invokeHandler(event, context, graphqlHandler)
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  } finally {
    //
  }
  return {
    ...response,
    headers: {
      ...response.headers,
      ...headerTokens,
    },
  }
}
