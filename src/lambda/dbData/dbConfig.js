module.exports = {
  aws_table_name: 'lessons',
  aws_local_config: {
    accessKeyId: 'local',
    secretAccessKey: 'local',
  },
  aws_remote_config: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    region: 'sa-east-1',
  },
}
