const { pbkdf2Sync } = require('crypto')

const config = {
  hashLength: 32,
  iterations: 1000,
  digest: 'sha512',
}
const salt = Buffer.alloc(8, process.env.PASSWORD_SALT, 'base64')

export const hashPassword = (password) => {
  if (password) {
    const key = pbkdf2Sync(
      password,
      salt,
      config.iterations,
      config.hashLength,
      config.digest
    ).toString('hex')

    return key
  } else return null
}

export const verifyPassword = (password, hash) => {
  if (
    pbkdf2Sync(
      password,
      salt,
      config.iterations,
      config.hashLength,
      config.digest
    ).toString('hex') === hash
  )
    return true
  else return false
}
