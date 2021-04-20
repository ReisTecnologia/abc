import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Spinner } from '_shared/Spinner'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMutation } from '@apollo/client'
import { ADD_HASH_USER_MUTATION } from './ADD_HASH_USER_MUTATION'

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
  min-width: 210px;
`
const SubmitButton = styled.button`
  margin-top: 15px;
`
const ConfirmationText = styled.div`
  width: 75%;
  text-align: center;
`

export const ForgotPassword = () => {
  const [value, setValue] = useState('')
  const [login, setLogin] = useState(null)
  const [email, setEmail] = useState(null)

  const [addHashUser, { data, loading: userLoading }] = useMutation(
    ADD_HASH_USER_MUTATION,
    {
      variables: {
        input: login ? { login: login } : { email: email },
      },
      notifyOnNetworkStatusChange: true,
      onError: () => {
        toast.error('Usuário ou email invalido!', {
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
    } else {
      setLogin(value)
    }
  }
  useEffect(() => {
    if (email || login) addHashUser()
  }, [login, email, addHashUser])

  return (
    <Wrapper>
      {userLoading ? (
        <Spinner />
      ) : !data ? (
        <Form>
          <Label>Ensira seu usuário ou email:</Label>
          <input
            type="text"
            id="login"
            value={value}
            onChange={handleLoginChange}
          />
          <SubmitButton onClick={submitUser}>Confirmar</SubmitButton>
        </Form>
      ) : (
        <ConfirmationText>
          Enviamos para o seu email um link para troca de senha. Por favor
          clique neste link para trocar a sua senha. Não esqueça de verificar a
          caixa de spam.
        </ConfirmationText>
      )}
      <ToastContainer />
    </Wrapper>
  )
}
