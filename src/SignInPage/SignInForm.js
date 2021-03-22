import styled from 'styled-components'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SIGNIN_MUTATION } from './SIGNIN_MUTATION'
import { saveTokens } from 'shared/AuthTokens/saveTokens'
import { useHistory } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 25%;
  align-items: center;
`
const Wrapper = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
`
const Label = styled.label`
  margin-bottom: 15px;
  margin-top: 15px;
`
const SubmitButton = styled.button`
  margin-top: 15px;
`

export const SignInForm = () => {
  let history = useHistory()

  const navigateToMenu = () => {
    history.push('/menu')
  }
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const afterComplete = (data) => {
    if (data) {
      saveTokens(data.signIn)
      navigateToMenu()
    }
  }

  const [signIn, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: { login: login, password: password },
    onCompleted: afterComplete,
  })

  const handleLoginChange = (e) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const submitSignIn = (e) => {
    e.preventDefault()
    signIn()
    afterComplete(data)
  }

  return (
    <Wrapper>
      {loading ? (
        <Spinner />
      ) : (
        <Form>
          <Label>Usuário:</Label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={handleLoginChange}
          />
          <Label>Senha:</Label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <SubmitButton onClick={submitSignIn}>Entrar</SubmitButton>
        </Form>
      )}
    </Wrapper>
  )
}
