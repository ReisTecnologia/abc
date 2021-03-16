import styled from 'styled-components'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SIGNIN_MUTATION } from './SIGNIN_MUTATION'
import { saveTokens } from './ManageTokens'

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
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [signIn, { data }] = useMutation(SIGNIN_MUTATION, {
    variables: { login: login, password: password },
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
    if (data && data.signIn) {
      saveTokens(data.signIn)
      console.log('data', data)
      console.log('data.signIn', data.signIn)
    }
  }
  return (
    <Wrapper>
      <Form onSubmit={submitSignIn}>
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
        <SubmitButton value="submit">Entrar</SubmitButton>
      </Form>
    </Wrapper>
  )
}
