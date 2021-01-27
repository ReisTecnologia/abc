const devConfigs = {
  aws_table_name: 'lessons',
  aws_config: {
    region: 'localhost',
    endpoint: 'http://localhost:8000/',
    accessKeyId: 'access_key_id',
    secretAccessKey: 'secret_access_key',
  },
}

const prodConfigs = {
  aws_table_name: 'lessons',
  aws_config: {
    accessKeyId: process.env.MY_AWS_DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_DB_SECRET_ACCESS_KEY,
    region: 'sa-east-1',
  },
}

module.exports = {
  devConfigs,
  awsConfig: process.env.NODE_ENV === 'development' ? devConfigs : prodConfigs,
}
