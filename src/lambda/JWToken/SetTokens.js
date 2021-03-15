const { sign } = require('jsonwebtoken')

export const setTokens = (user) => {
  const sevenDays = 60 * 60 * 24 * 7 * 1000
  const fifteenMins = 60 * 15 * 1000
  const accessUser = {
    id: user.id,
  }
  const accessToken = sign({ user: accessUser }, 'secretAccessKey', {
    expiresIn: fifteenMins,
  })
  const refreshUser = {
    id: user.id,
    count: user.tokenCount,
  }
  const refreshToken = sign({ user: refreshUser }, 'secretRefreshKey', {
    expiresIn: sevenDays,
  })

  return { accessToken, refreshToken }
}
