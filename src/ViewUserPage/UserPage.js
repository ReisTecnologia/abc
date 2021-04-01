import React from 'react'
import { Container } from 'shared/Container'
import { Layout } from 'shared/Layout'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Header } from 'shared/Header/Header'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: solid 1px #ccc;
`
const InfoWrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`
const Label = styled.label`
  padding-right: 5px;
`
const UserWrapper = styled.div``

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
