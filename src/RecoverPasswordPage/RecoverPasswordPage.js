import React, { useState } from 'react'
import { SAVE_PASSWORD_MUTATION } from './SAVE_PASSWORD_MUTATION'
import { Spinner } from '_shared/Spinner'
import { useMutation } from '@apollo/client'
import { Container } from '_shared/Container'
import { Layout } from '_shared/Layout'
import PropTypes from 'prop-types'
import { ChangePasswordForm } from './ChangePasswordForm'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HeaderWrapper } from '_shared/HeaderWrapper'

const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}

const successfulToast = (message) => {
  toast.success(message, toastConfig)
}
const errorToast = (message) => {
  toast.error(message, toastConfig)
}

export const RecoverPasswordPage = ({ user }) => {
  const [userPassword, setUserPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  const [savePassword, { loading: savePasswordLoading }] = useMutation(
    SAVE_PASSWORD_MUTATION,
    {
      variables: {
        id: user.name,
        hashUserId: user.id,
        input: userPassword,
      },
      onCompleted: () => {
        successfulToast('Senha salva com sucesso')
      },
      onError: (error) => {
        console.error(error)
        errorToast('Erro ao salvar senha')
      },
    }
  )

  return (
    <Layout>
      <HeaderWrapper />
      <Container>
        {savePasswordLoading ? (
          <Spinner />
        ) : (
          <>
            <ChangePasswordForm
              userLogin={user.login}
              userEmail={user.email}
              userPassword={userPassword}
              setUserPassword={setUserPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              savePassword={savePassword}
            />
            <ToastContainer />
          </>
        )}
      </Container>
    </Layout>
  )
}

RecoverPasswordPage.propTypes = {
  user: PropTypes.object,
}
