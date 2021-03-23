import React, { useState } from 'react'
import { SAVE_USER_MUTATION } from './SAVE_USER_MUTATION'
import styled from 'styled-components'
import { Spinner } from 'shared/Spinner'
import { useMutation } from '@apollo/client'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { Layout } from 'shared/Layout'
import { MenuDrawer } from 'shared/MenuDrawer'
import PropTypes from 'prop-types'

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

export const EditableUser = ({ user }) => {
  console.log('user', user)
  const [userInfo, setUserInfo] = useState({
    login: user.login,
    name: user.name,
    previousLogin: user.login,
    password: user.password,
    type: user.type,
  })
  const afterComplete = () => {
    setUserInfo({ ...userInfo, previousLogin: user.login })
  }
  const [saveUser, { loading }] = useMutation(SAVE_USER_MUTATION, {
    variables: {
      id: user.id,
      input: userInfo,
    },
    onCompleted: afterComplete,
  })

  console.log('userInfo', userInfo)
  const handleLoginChange = (e) => {
    setUserInfo({ ...userInfo, login: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value })
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
    <Layout>
      <HeaderWrapper>
        <MenuDrawer />
      </HeaderWrapper>
      <Container>
        <Wrapper>
          {loading ? (
            <Spinner />
          ) : (
            <Form>
              <Label>Usuário:</Label>
              <input
                type="text"
                id="login"
                value={userInfo.login}
                onChange={handleLoginChange}
              />
              <Label>Senha:</Label>
              <input
                type="password"
                id="password"
                value={userInfo.password}
                onChange={handlePasswordChange}
              />
              <Label>Nome:</Label>
              <input
                type="text"
                id="name"
                value={userInfo.name}
                onChange={handleNameChange}
              />
              <Label>Tipo de usuário:</Label>
              <select onChange={handleTypeChange} value={userInfo.type}>
                <option value={'admin'}>{'Admin'}</option>
                <option value={'student'}>{'Student'}</option>
              </select>
              <SubmitButton onClick={submitSaveUser}>Salvar</SubmitButton>
            </Form>
          )}
        </Wrapper>
      </Container>
    </Layout>
  )
}

EditableUser.propTypes = {
  user: PropTypes.object,
  afterComplete: PropTypes.func,
}
