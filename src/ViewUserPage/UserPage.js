import React from 'react'
import { Container } from 'shared/Container'
import { Layout } from 'shared/Layout'
import PropTypes from 'prop-types'
import { Wrapper, InfoWrapper, Label, UserWrapper } from './UserPage.styles'
import { Header } from 'shared/Header/Header'

const userInfoFields = (label, userInfo) => (
  <InfoWrapper>
    <Label>{label}</Label>
    {userInfo}
  </InfoWrapper>
)

export const UserPage = ({ user }) => {
  return (
    <Layout>
      <Header title="Usuário" />
      <Container>
        <Wrapper>
          <UserWrapper>
            {userInfoFields('ID:', user.id)}
            {userInfoFields('Nome:', user.name)}
            {userInfoFields('Tipo:', user.type)}
            {userInfoFields('Login:', user.login)}
            {userInfoFields('Email:', user.email)}
          </UserWrapper>
        </Wrapper>
      </Container>
    </Layout>
  )
}

UserPage.propTypes = {
  user: PropTypes.object,
  userInitial: PropTypes.string,
}
