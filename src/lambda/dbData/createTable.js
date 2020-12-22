const AWS = require('aws-sdk')
const config = require('./dbConfig.js')
// const  uuidv1 = require( 'uuid/v1')

AWS.config.update(config.aws_local_config)

var dynamodb = new AWS.DynamoDB()
const createString = (name) => ({
  AttributeName: name,
  AttributeType: 'S',
})
const createSchema = (attributeName, KeyType) => ({
  AttributeName: attributeName,
  KeyType: KeyType,
})
const createTableParams = {
  AttributeDefinitions: [createString('id'), createString('name')],
  KeySchema: [createSchema('id', 'HASH'), createSchema('name', 'RANGE')],
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
const createItem = (id, name) => ({
  PutRequest: {
    Item: {
      id: {
        S: id,
      },
      name: {
        S: name,
      },
    },
  },
})

var createItemsParam = {
  RequestItems: {
    lessons: [
      createItem('1', 'A'),
      createItem('2', 'E'),
      createItem('3', 'I'),
      createItem('4', 'O'),
      createItem('5', 'U'),
    ],
  },
}

const createItems = () => {
  dynamodb.batchWriteItem(createItemsParam, function (err, data) {
    if (err) console.log(err, err.stack)
    else console.log('Items added successfully', data)
  })
}

var tableExistsParams = {
  TableName: 'lessons',
}

dynamodb.waitFor('tableExists', tableExistsParams, createItems)
