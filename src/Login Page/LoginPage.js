import React from 'react'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { Layout } from 'shared/Layout'
import { LoginForm } from './LoginForm'

export const LoginPage = () => {
  return (
    <Layout>
      <HeaderWrapper></HeaderWrapper>
      <Container>
        <LoginForm />
      </Container>
    </Layout>
  )
}
