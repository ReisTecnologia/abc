module.exports = {
  aws_table_name: 'lessons',
  aws_local_config: {
    region: 'localhost',
    endpoint: 'http://localhost:8000/',
    accessKeyId: 'access_key_id',
    secretAccessKey: 'secret_access_key',
  },
  aws_remote_config: {
    // accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    accessKeyId: 'AKIA2VL5KESIFFAQ4GGI',
    secretAccessKey: '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',
    region: 'sa-east-1',
  },
}
