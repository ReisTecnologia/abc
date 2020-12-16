const AWS = require('aws-sdk')
const config = require('./dbConfig.js')
// const  uuidv1 = require( 'uuid/v1')

AWS.config.update(config.aws_local_config)

var dynamodb = new AWS.DynamoDB()

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

try {
  dynamodb.createTable(createTableParams, function (err, data) {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })
} catch (err) {
  throw 'error'
} finally {
  console.log('In case of ResourceInUseException, table already exists')
}
