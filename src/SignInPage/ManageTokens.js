// module for saving tokens to local storage
const TOKEN_KEY = 'stampTokens'
// tokens = { accessToken: "xyz", refreshToken: "abc" }
export const saveTokens = (tokens) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
}

export const getTokens = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY))
}

export const deleteTokens = () => {
  localStorage.removeItem(TOKEN_KEY)
}
