import React, { useState } from 'react'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { Layout } from 'shared/Layout'
import { SignInForm } from './SignInForm'
import { ForgotPassword } from './ForgotPasswordForm/ForgotPassword'

export const SignInPage = () => {
  const [showSigninForm, setShowSigninForm] = useState(true)
  return (
    <Layout>
      <HeaderWrapper></HeaderWrapper>
      <Container>
        {showSigninForm ? (
          <SignInForm setShowSigninForm={setShowSigninForm} />
        ) : (
          <ForgotPassword />
        )}
      </Container>
    </Layout>
  )
}
