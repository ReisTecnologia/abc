import React, { useState } from 'react'
import { SAVE_USER_MUTATION } from './SAVE_USER_MUTATION'
import { SAVE_PASSWORD_MUTATION } from './SAVE_PASSWORD_MUTATION'
import { Spinner } from 'shared/Spinner'
import { useMutation } from '@apollo/client'
import { Container } from 'shared/Container'
import { Layout } from 'shared/Layout'
import { UserInfoForm } from './UserInfoForm'
import PropTypes from 'prop-types'
import { Wrapper, FormsWrapper } from './EditableUser.styles.js'
import { PasswordChangeForm } from './PasswordChangeForm'
import { Header } from 'shared/Header/Header'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const EditableUser = ({ user }) => {
  const [userInfo, setUserInfo] = useState({
    login: user.login,
    name: user.name,
    previousLogin: user.login,
    type: user.type,
  })
  const [userPassword, setUserPassword] = useState({ password: user.password })
  const [confirmPassword, setConfirmPassword] = useState(null)
  const afterComplete = () => {
    setUserInfo({ ...userInfo, previousLogin: user.login })
  }
  const onSaveUserError = () => {
    toast.error('Erro ao salvar usuário', {
      position: 'top-center',
      hideProgressBar: true,
      transition: Slide,
    })
  }
  const [saveUser, { loading }] = useMutation(SAVE_USER_MUTATION, {
    variables: {
      id: user.id,
      input: userInfo,
    },
    onCompleted: afterComplete,
    onError: onSaveUserError,
  })

  const [savePassword, { loading: savePasswordLoading }] = useMutation(
    SAVE_PASSWORD_MUTATION,
    {
      variables: {
        id: user.id,
        input: userPassword,
      },
    }
  )

  return (
    <Layout>
      <Header />
      <Container>
        <Wrapper>
          {loading || savePasswordLoading ? (
            <Spinner />
          ) : (
            <FormsWrapper>
              <UserInfoForm
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                saveUser={saveUser}
              />
              <PasswordChangeForm
                userPassword={userPassword}
                setUserPassword={setUserPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                savePassword={savePassword}
              />
              <ToastContainer />
            </FormsWrapper>
          )}
        </Wrapper>
      </Container>
    </Layout>
  )
}

EditableUser.propTypes = {
  user: PropTypes.object,
  afterComplete: PropTypes.func,
  userInitial: PropTypes.string,
}
