import React, { useState } from 'react'
import { HeaderWrapper } from '_shared/HeaderWrapper'
import { Container } from '_shared/Container'
import { Layout } from '_shared/Layout'
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
