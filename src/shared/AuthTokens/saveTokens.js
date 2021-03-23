const TOKEN_KEY = 'stampTokens'

export const saveTokens = (tokens) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
}
