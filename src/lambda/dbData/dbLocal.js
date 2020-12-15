const AWS = require('aws-sdk')
const config = require('./dbConfig.js')
// const  uuidv1 = require( 'uuid/v1')

AWS.config.update(config.aws_local_config)

var dynamodb = new AWS.DynamoDB()

var params = {}

const tableList = dynamodb.listTables(params, function (err, data) {
  if (err) console.log(err, err.stack)
  else console.log(data)
})

const checkTable = () => {
  const createTableParams = {
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'name',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'name',
        KeyType: 'RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    TableName: 'lessons',
  }
  if (tableList.length === 0)
    return dynamodb.createTable(createTableParams, function (err, data) {
      if (err) console.log(err, err.stack)
      else console.log(data)
    })
  else console.log('table already exists')
}

module.exports = {
  checkTable,
}
