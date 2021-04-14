import React from 'react'
import { Form, Label, SubmitButton } from './EditableUser.styles.js'
import PropTypes from 'prop-types'
import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}

export const PasswordChangeForm = ({
  userPassword,
  setUserPassword,
  savePassword,
  confirmPassword,
  setConfirmPassword,
}) => {
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
    <Form>
      <Label>Nova Senha:</Label>
      <input type="password" onChange={handlePasswordChange} />
      <Label>Confirme nova senha:</Label>
      <input type="password" onChange={handleConfirmPasswordChange} />
      <SubmitButton onClick={submitSavePassword}>Salvar</SubmitButton>
    </Form>
  )
}

PasswordChangeForm.propTypes = {
  userPassword: PropTypes.object,
  setUserPassword: PropTypes.func,
  savePassword: PropTypes.func,
  confirmPassword: PropTypes.string,
  setConfirmPassword: PropTypes.func,
}
