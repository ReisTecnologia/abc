const { gql } = require('@apollo/client')
const AWS = require('aws-sdk')
const config = require('./dbConfig.js')
// const  uuidv1 = require( 'uuid/v1')

AWS.config.update(config.aws_remote_config)

const TABLE_NAME = 'lessons'

const getLessons = async function () {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    TableName: TABLE_NAME,
  }

  return docClient
    .scan(params)
    .promise()
    .then(({ Items }) => Items)
}

const getLesson = () => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    ExpressionAttributeValues: {
      ':id': { S: 'a' },
    },
    KeyConditionExpression: 'id = :id',
    TableName: TABLE_NAME,
  }
  return docClient.query(params, function (err, data) {
    if (err) console.log('Error', err)
    else console.log(data)
  })
}
const addLesson = () => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    Item: {
      id: {
        S: 'test',
      },
    },
    TableName: TABLE_NAME,
  }

  return docClient.put(params, function (err, data) {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })
}

// const addLesson = async function () {
//   const docClient = new AWS.DynamoDB.DocumentClient()
//   const params = {
//     Item: {
//       id: {
//         S: 'test',
//       },
//     },
//     TableName: TABLE_NAME,
//   }

//   return docClient
//     .put(params)
//     .promise()
//     .then(console.log(Item.id))
// }
// const addMovie = function (req, res) {
//   AWS.config.update(config.aws_remote_config)
//   const docClient = new AWS.DynamoDB.DocumentClient()
//   const Item = { ...req.body }
// Item.id = uuidv1()
//   var params = {
//     TableName: config.aws_table_name,
//     Item: Item,
//   }

//   // Call DynamoDB to add the item to the table
//   docClient.put(params, function (err, data) {
//     if (err) {
//       res.send({
//         success: false,
//         message: err,
//       })
//     } else {
//       res.send({
//         success: true,
//         message: 'Added movie',
//         movie: data,
//       })
//     }
//   })
// }
module.exports = {
  getLessons,
  getLesson,
  addLesson,
}
