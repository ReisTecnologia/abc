import React from 'react'
import { useQuery } from '@apollo/client'
import { AddUserButton } from './AddUserButton/AddUserButton'
import { ListItem } from './ListItem/ListItem'
import { USERS_QUERY } from './USERS_QUERY'
import { Layout } from 'shared/Layout'
import { Container } from 'shared/Container'
import { Header } from 'shared/Header/Header'

export const UsersPage = () => {
  const { data, refetch, loading } = useQuery(USERS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })
  const users = data && data.users ? data.users : []

  return (
    <Layout>
      <Header
        title="Usuários"
        loading={loading}
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
