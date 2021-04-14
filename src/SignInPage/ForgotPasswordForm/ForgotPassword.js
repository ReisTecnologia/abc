import styled from 'styled-components'
import React, { useState } from 'react'
import { Spinner } from 'shared/Spinner'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { USER_QUERY } from './USER_QUERY'
import 'react-toastify/dist/ReactToastify.css'
import { useLazyQuery } from '@apollo/client'

const Form = styled.div`
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

export const ForgotPassword = () => {
  const [value, setValue] = useState('')
  const [login, setLogin] = useState(null)
  const [email, setEmail] = useState(null)
  const [checkUser, { called, data, loading: userLoading }] = useLazyQuery(
    USER_QUERY,
    {
      variables: login ? { login: login } : { email: email },
      notifyOnNetworkStatusChange: true,
      onError: () => {
        toast.error('Usuário não existe!', {
          position: 'top-center',
          hideProgressBar: true,
          transition: Slide,
        })
      },
    }
  )

  const handleLoginChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  const submitUser = (e) => {
    e.preventDefault()
    if (value.includes('@')) {
      setEmail(value)
      checkUser()
    } else {
      setLogin(value)
      checkUser()
    }
  }

  return (
    <Wrapper>
      {userLoading ? (
        <Spinner />
      ) : !called || !data ? (
        <Form>
          <Label>Ensira seu usuário ou email:</Label>
          <input
            type="text"
            id="login"
            value={value}
            onChange={handleLoginChange}
          />
          <SubmitButton onClick={submitUser}>Confirmar</SubmitButton>
          <ToastContainer />
        </Form>
      ) : (
        <div>
          Enviamos para o seu email um link para troca de senha. Por favor
          clique neste link para trocar a sua senha. Não esqueça de verificar a
          caixa de spam.
        </div>
      )}
    </Wrapper>
  )
}
