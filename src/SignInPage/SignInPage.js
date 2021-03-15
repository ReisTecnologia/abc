import React from 'react'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { Layout } from 'shared/Layout'
import { SignInForm } from './SignInForm'

export const SignInPage = () => {
  return (
    <Layout>
      <HeaderWrapper></HeaderWrapper>
      <Container>
        <SignInForm />
      </Container>
    </Layout>
  )
}
