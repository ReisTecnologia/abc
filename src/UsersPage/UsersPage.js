import React from 'react'
import { AddUserButton } from './AddUserButton/AddUserButton'
import { ListItem } from './ListItem/ListItem'
import { Layout } from '_shared/Layout'
import { Container } from '_shared/Container'
import { Header } from '_shared/Header/Header'
import PropTypes from 'prop-types'
import { sortByName } from '_shared/sortByName'

export const UsersPage = ({ users, refetch }) => {
  return (
    <Layout>
      <Header
        title="Usuários"
        pageActions={<AddUserButton afterAdd={refetch} />}
      />
      <Container>
        {sortByName(users).map((user) => (
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
