import React from 'react'
import { Form, Label, SubmitButton } from './EditableUser.styles.js'
import PropTypes from 'prop-types'

export const UserInfoForm = ({ setUserInfo, userInfo, saveUser }) => {
  const handleLoginChange = (e) => {
    setUserInfo({ ...userInfo, login: e.target.value })
  }

  const handleNameChange = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value })
  }

  const handleTypeChange = (e) => {
    setUserInfo({ ...userInfo, type: e.target.value })
  }

  const submitSaveUser = (e) => {
    e.preventDefault()
    saveUser()
  }

  return (
    <Form>
      <Label>Usuário:</Label>
      <input type="text" value={userInfo.login} onChange={handleLoginChange} />
      <Label>Nome:</Label>
      <input type="text" value={userInfo.name} onChange={handleNameChange} />
      <Label>Tipo de usuário:</Label>
      <select onChange={handleTypeChange} value={userInfo.type}>
        <option value={'admin'}>{'Admin'}</option>
        <option value={'student'}>{'Student'}</option>
      </select>
      <SubmitButton onClick={submitSaveUser}>Salvar</SubmitButton>
    </Form>
  )
}

UserInfoForm.propTypes = {
  setUserInfo: PropTypes.func,
  userInfo: PropTypes.object,
  saveUser: PropTypes.func,
}
