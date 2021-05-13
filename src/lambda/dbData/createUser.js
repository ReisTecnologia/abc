const AWS = require('aws-sdk')
const config = require('./dbConfig.js')
const { pbkdf2Sync } = require('crypto')
const db = require('./db')

AWS.config.update(config.awsConfig.aws_config)

const hashConfig = {
  hashLength: 32,
  iterations: 1000,
  digest: 'sha512',
}

const salt = Buffer.alloc(8, process.env.PASSWORD_SALT, 'base64')

const hashPassword = (password) => {
  if (password) {
    const key = pbkdf2Sync(
      password,
      salt,
      hashConfig.iterations,
      hashConfig.hashLength,
      hashConfig.digest
    ).toString('hex')

    return key
  } else return null
}

const addFirstUser = async () => {
  let success = false

  success = await db
    .addUser(
      'id',
      'name',
      'admin',
      hashPassword('123'),
      'admin',
      'example@email.com',
      []
    )
    .then(() => true)
    .catch(() => false)
  if (success)
    console.log('Usuário criado com sucesso. Login: admin Senha: 123')
  if (!success) console.log('Criação de usuário falhou!')
}

addFirstUser()
