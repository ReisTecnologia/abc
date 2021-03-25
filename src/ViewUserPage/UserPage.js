import React from 'react'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { Container } from 'shared/Container'
import { Layout } from 'shared/Layout'
import { MenuDrawer } from 'shared/MenuDrawer'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

export const Title = styled.div`
  margin-left: 2rem;
  font-size: 1.3rem;
`

const userInfoFields = (label, userInfo) => (
  <InfoWrapper>
    <Label>{label}</Label>
    {userInfo}
  </InfoWrapper>
)

export const UserPage = ({ user }) => {
  return (
    <Layout>
      <HeaderWrapper>
        <MenuDrawer />
        <Title>Usuário</Title>
      </HeaderWrapper>
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
}
