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

dynamodb.createTable(createTableParams, function (err, data) {
  if (err && err.code === 'ResourceInUseException')
    console.log(
      'Table' + ' ' + createTableParams.TableName + ' ' + 'already exists'
    )
  else if (err) console.log(err, err.stack)
  else console.log(data)
})

var createItemsParam = {
  RequestItems: {
    lessons: [
      {
        PutRequest: {
          Item: {
            id: {
              S: '1',
            },
            name: {
              S: 'A',
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: {
              S: '2',
            },
            name: {
              S: 'E',
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: {
              S: '3',
            },
            name: {
              S: 'I',
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: {
              S: '4',
            },
            name: {
              S: 'O',
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: {
              S: '5',
            },
            name: {
              S: 'U',
            },
          },
        },
      },
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
