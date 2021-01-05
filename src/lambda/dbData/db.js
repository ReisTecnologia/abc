const { gql } = require('@apollo/client')
const AWS = require('aws-sdk')
const config = require('./dbConfig.js')

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

const getLesson = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    ExpressionAttributeValues: {
      ':id': id,
    },
    KeyConditionExpression: 'id = :id',
    TableName: TABLE_NAME,
  }
  return docClient.query(params)
}

const deleteLesson = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  return docClient.delete({
    Key: { id: id },
    ReturnItemCollectionMetrics: "SIZE",
    TableName: TABLE_NAME,
  }).promise()
}

const addLesson = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    Item: {
      id: id,
      name: 'Nova Aula',
    },
    TableName: TABLE_NAME,
  }

  return docClient.put(params).promise()
}

module.exports = {
  getLessons,
  getLesson,
  addLesson,
  deleteLesson,
}
