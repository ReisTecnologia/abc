import React from 'react'
import { HeaderWrapper } from '_shared/HeaderWrapper'
import { Layout } from '_shared/Layout'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
`

export const ExpiredLinkPage = () => {
  return (
    <Layout>
      <HeaderWrapper />
      <Wrapper>O link que você está tentando acessar expirou.</Wrapper>
    </Layout>
  )
}
