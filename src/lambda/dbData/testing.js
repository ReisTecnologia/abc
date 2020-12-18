const AWS = require('aws-sdk')
const config = require('./dbConfig.js')
// const  uuidv1 = require( 'uuid/v1')

AWS.config.update(config.aws_remote_config)

const TABLE_NAME = 'lessons'

const dynamodb = new AWS.DynamoDB()

var params = {
  // secretAccessKey: 'my7FWAEj75O5bcyKSM/tT9evdTQn+LVzLgm9apEA',
  // accessKeyId: 'AKIA2VL5KESILJPGH4HI ',
  Key: {
    id: {
      S: 'lesson',
    },
  },
  TableName: TABLE_NAME,
}

dynamodb.getItem(params, function (err, data) {
  if (err) console.log(err, err.stack)
  else console.log(data)
})
