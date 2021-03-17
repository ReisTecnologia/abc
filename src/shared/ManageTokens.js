const TOKEN_KEY = 'stampTokens'
export const saveTokens = (tokens) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
}

export const getTokens = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY))
}

export const deleteTokens = () => {
  localStorage.removeItem(TOKEN_KEY)
}
