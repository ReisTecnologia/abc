const TOKEN_KEY = 'stampTokens'

export const getTokens = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY))
}
