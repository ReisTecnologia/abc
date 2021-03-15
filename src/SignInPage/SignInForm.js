import styled from 'styled-components'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SIGNIN_MUTATION } from './SIGNIN_MUTATION'
import { saveTokens, getTokens } from './ManageTokens'

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

  const [signIn] = useMutation(SIGNIN_MUTATION)

  const handleLoginChange = (e) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const submitSignIn = async (e) => {
    e.preventDefault()
    const { data } = await signIn({
      variables: { login: login, password: password },
    })
    if (data && data.signIn) {
      saveTokens(data.signIn)
      console.log('getTokens', getTokens())
    }
  }
  return (
    <Wrapper>
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
    </Wrapper>
  )
}
