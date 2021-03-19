import React, { useContext } from 'react'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { Layout } from 'shared/Layout'
import { SignInForm } from './SignInForm'
import { deleteTokens } from 'shared/AuthTokens/deleteTokens'
import { Spinner } from 'shared/Spinner'
import { CurrentUserContext } from '../CurrentUserContextProvider'

export const SignInPage = () => {
  const { userData, userDataLoading } = useContext(CurrentUserContext)

  if (userDataLoading) return <Spinner />

  if (userData !== undefined && userData.signedInUser)
    return (
      <>
        <div>Você está logado!</div>
        <button onClick={deleteTokens}>Sign Out</button>
      </>
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
