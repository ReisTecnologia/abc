import styled from 'styled-components'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SIGNIN_MUTATION } from './SIGNIN_MUTATION'
import { saveTokens } from 'shared/AuthTokens/saveTokens'
import { useHistory } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'
import { ToastContainer, toast, Slide } from 'react-toastify'
import PropTypes from 'prop-types'
import 'react-toastify/dist/ReactToastify.css'
import { colors } from 'shared/colors'

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
const ForgotPasswordText = styled.div`
  margin-top: 15px;

  :hover {
    cursor: pointer;
    text-decoration: underline;
    color: ${colors.primary};
  }
`

export const SignInForm = ({ setShowSigninForm }) => {
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
      history.go(0)
    }
  }

  const hideSigninForm = () => setShowSigninForm(false)

  const [signIn, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: { login: login, password: password },
    onCompleted: afterComplete,
    onError: () => {
      toast.error('Usuário ou senha incorreta.', {
        position: 'top-center',
        hideProgressBar: true,
        transition: Slide,
      })
    },
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
          <ForgotPasswordText onClick={hideSigninForm}>
            Esqueceu sua senha?
          </ForgotPasswordText>
          <ToastContainer />
        </Form>
      )}
    </Wrapper>
  )
}

SignInForm.propTypes = {
  setShowSigninForm: PropTypes.func,
}
