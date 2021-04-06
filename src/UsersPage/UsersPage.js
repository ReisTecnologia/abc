import React from 'react'
import { AddUserButton } from './AddUserButton/AddUserButton'
import { ListItem } from './ListItem/ListItem'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { Header } from 'shared/Header/Header'
import PropTypes from 'prop-types'

export const UsersPage = ({ users, refetch }) => {
  return (
    <Layout>
      <Header
        title="Usuários"
        pageActions={<AddUserButton afterAdd={refetch} />}
      />
      <Container>
        {users.map((user) => (
          <ListItem key={user.id} user={user} />
        ))}
      </Container>
    </Layout>
  )
}

UsersPage.propTypes = {
  users: PropTypes.array,
  refetch: PropTypes.func,
}
