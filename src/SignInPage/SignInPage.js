import React, { useContext } from 'react'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { Layout } from 'shared/Layout'
import { SignInForm } from './SignInForm'
import { Spinner } from 'shared/Spinner'
import { CurrentUserContext } from 'shared/CurrentUserContextProvider'

export const SignInPage = () => {
  const { userData, userDataLoading } = useContext(CurrentUserContext)

  if (userDataLoading) return <Spinner />

  if (userData !== undefined && userData.signedInUser)
    return (
      <Layout>
        <HeaderWrapper></HeaderWrapper>
        <Container>
          <div>Você está logado!</div>
        </Container>
      </Layout>
    )
  return (
    <Layout>
      <HeaderWrapper></HeaderWrapper>
      <Container>
        <SignInForm />
      </Container>
    </Layout>
  )
}
