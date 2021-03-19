const { verify } = require('jsonwebtoken')
import { setTokens } from './setTokens'

const validateAccessToken = (token) => {
  try {
    return verify(token, 'secretAccessKey')
  } catch {
    return null
  }
}

const validateRefreshToken = (token) => {
  try {
    return verify(token, 'secretRefreshKey')
  } catch {
    return null
  }
}

export const validateTokens = async ({ accessToken, refreshToken, db }) => {
  const returnPayload = {
    headerTokens: {},
    user: null,
  }

  if (accessToken) {
    const decodedAccessToken = validateAccessToken(accessToken)
    if (decodedAccessToken && decodedAccessToken.user) {
      returnPayload.user = decodedAccessToken.user
      return returnPayload
    }
  }
  if (refreshToken) {
    const decodedRefreshToken = validateRefreshToken(refreshToken)
    if (decodedRefreshToken && decodedRefreshToken.user) {
      returnPayload.user = decodedRefreshToken.user
      const user = await db.getUser(null, decodedRefreshToken.user.id)
      const userTokens = setTokens(user)
      returnPayload.headerTokens = {
        'Access-Control-Expose-Headers': 'x-access-token,x-refresh-token',
        'x-access-token': userTokens.accessToken,
        'x-refresh-token': userTokens.refreshToken,
      }
      return returnPayload
    }
  }
  return returnPayload
}
