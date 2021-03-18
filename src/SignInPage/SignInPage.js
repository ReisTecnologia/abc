import React from 'react'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { useQuery } from '@apollo/client'
import { Layout } from 'shared/Layout'
import { SignInForm } from './SignInForm'
import { deleteTokens } from 'shared/ManageTokens'
import { Spinner } from 'shared/Spinner'
import { SIGNED_USER_QUERY } from 'shared/SIGNED_USER_QUERY'

export const SignInPage = () => {
  const { data, loading } = useQuery(SIGNED_USER_QUERY)

  if (loading) return <Spinner />
  console.log(data)
  if (data !== undefined && data.signedInUser)
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
