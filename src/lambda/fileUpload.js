const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const serverless = require('serverless-http')
const cors = require('cors')
const upload = multer()
const app = express()
const s3 = new AWS.S3({
  accessKeyId: process.env.MY_AWS_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_BUCKET_SECRET_ACCESS_KEY,
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST,DELETE')
  app.use(cors())
  next()
})
app.post(
  '/.netlify/functions/fileUpload',
  upload.single('fileupload'),
  (req, res) => {
    if (req.method === 'POST') {
      s3.putObject({
        Bucket: process.env.REACT_APP_MY_AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: Buffer.from(req.file.buffer),
        ContentType: req.file.mimetype,
      })
        .promise()
        .then(() => res.sendStatus(200))
    } else res.sendStatus(403)
  }
)
module.exports.handler = serverless(app)
