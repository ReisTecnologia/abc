const TOKEN_KEY = 'stampTokens'

export const deleteTokens = () => {
  localStorage.removeItem(TOKEN_KEY)
}
