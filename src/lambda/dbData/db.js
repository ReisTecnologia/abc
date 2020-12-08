const  AWS = require( 'aws-sdk')
const  config = require( './dbConfig.js')
const  uuidv1 = require( 'uuid/v1')

AWS.config.update(config.aws_remote_config)

const TABLE_NAME = 'lessons'

const getLessons = async function () {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    TableName: TABLE_NAME,
  }

  return docClient.scan(params, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      const { Items } = data
      return Items
    }
  }).promise()
}

// const addMovie = function (req, res) {
//   AWS.config.update(config.aws_remote_config)
//   const docClient = new AWS.DynamoDB.DocumentClient()
//   const Item = { ...req.body }
//   Item.id = uuidv1()
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
}
