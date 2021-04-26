import React from 'react'
import PropTypes from 'prop-types'
import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { colors } from '_shared/colors'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  border: solid 1px ${colors.primary};
  border-radius: 5px;
  margin-left: 1rem;
  margin-right: 1rem;
  flex-direction: column;
  align-items: center;
  width: 35%;
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
  margin-bottom: 15px;
`

const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}

export const ChangePasswordForm = ({
  userLogin,
  userEmail,
  userPassword,
  setUserPassword,
  savePassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const cleanEmail = userEmail.substr(5)
  const cleanLogin = userLogin.substr(5)

  const handlePasswordChange = (e) => {
    setUserPassword({ password: e.target.value })
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const submitSavePassword = (e) => {
    e.preventDefault()
    if (confirmPassword !== userPassword.password)
      return toast.error('As senhas precisam ser iguais!', toastConfig)

    savePassword()
  }

  return (
    <Wrapper>
      <Form>
        <Label>Usuário:</Label>
        <div>{cleanLogin}</div>
        <Label>Email:</Label>
        <div>{cleanEmail}</div>
        <Label>Nova Senha:</Label>
        <input type="password" onChange={handlePasswordChange} />
        <Label>Confirme nova senha:</Label>
        <input type="password" onChange={handleConfirmPasswordChange} />
        <SubmitButton onClick={submitSavePassword}>Salvar</SubmitButton>
      </Form>
    </Wrapper>
  )
}

ChangePasswordForm.propTypes = {
  userLogin: PropTypes.string,
  userEmail: PropTypes.string,
  userPassword: PropTypes.object,
  setUserPassword: PropTypes.func,
  savePassword: PropTypes.func,
  confirmPassword: PropTypes.string,
  setConfirmPassword: PropTypes.func,
}
