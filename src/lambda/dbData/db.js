const AWS = require('aws-sdk')
const config = require('./dbConfig.js')

// console.log('node_env>>>>>', process.env.NODE_ENV)
// console.log('config.aws_config', config)

AWS.config.update(config.awsConfig.aws_config)

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

const getLesson = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    ExpressionAttributeValues: {
      ':id': id,
    },
    KeyConditionExpression: 'id = :id',
    TableName: TABLE_NAME,
  }
  return docClient
    .query(params)
    .promise()
    .then(({ Items }) => Items[0])
}

const deleteLesson = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  return docClient
    .delete({
      Key: { id: id },
      ReturnItemCollectionMetrics: 'SIZE',
      TableName: TABLE_NAME,
    })
    .promise()
}

const addLesson = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    Item: {
      id: id,
      name: 'Nova Aula',
      elements: [],
    },
    TableName: TABLE_NAME,
  }

  return docClient.put(params).promise()
}

const editLesson = (id, name) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    TableName: TABLE_NAME,
    Key: { id: id },
    ExpressionAttributeNames: { '#updatedName': 'name' },
    ExpressionAttributeValues: { ':newName': name },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'set #updatedName = :newName',
  }

  return docClient.update(params).promise()
}

module.exports = {
  getLessons,
  getLesson,
  addLesson,
  deleteLesson,
  editLesson,
}
