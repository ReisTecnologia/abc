const AWS = require('aws-sdk')

exports.handler = async (event) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.MY_AWS_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_BUCKET_SECRET_ACCESS_KEY,
  })

  var params = JSON.parse(event.body)

  var s3Params = {
    Bucket: process.env.REACT_APP_MY_AWS_BUCKET_NAME,
    Key: params.name,
  }
  var downloadURL = s3.getSignedUrl('getObject', s3Params)

  return {
    statusCode: 200,
    body: JSON.stringify({ downloadURL: downloadURL }),
  }
}
