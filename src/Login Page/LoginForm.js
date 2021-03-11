import styled from 'styled-components'
import React from 'react'

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

export const LoginForm = () => {
  return (
    <Wrapper>
      <Form>
        <Label>Usuário:</Label>
        <input type="text" id="login" />
        <Label>Senha:</Label>
        <input type="password" id="password" />
        <SubmitButton>Entrar</SubmitButton>
      </Form>
    </Wrapper>
  )
}
