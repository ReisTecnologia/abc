import { deleteTokens } from '_shared/AuthTokens/deleteTokens'
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Button = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
`

export const LogoutButton = () => {
  let history = useHistory()
  const navigateToMenu = () => {
    history.push('/menu')
    history.go(0)
  }
  const confirmAndLogout = () => {
    const logout = () => {
      deleteTokens()
      navigateToMenu()
    }
    var response = window.confirm('Tem certeza que quer deslogar?')
    response && logout()
  }
  return <Button onClick={confirmAndLogout}> Sair </Button>
}
