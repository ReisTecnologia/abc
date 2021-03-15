const { verify } = require('jsonwebtoken')

export const validateAccessToken = (token) => {
  try {
    return verify(token, 'secretAccessKey')
  } catch {
    return null
  }
}

export const validateRefreshToken = (token) => {
  try {
    return verify(token, 'secretRefreshKey')
  } catch {
    return null
  }
}
